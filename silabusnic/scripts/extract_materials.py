#!/usr/bin/env python3
"""Convert the odontology workbook into normalized JSON for the frontend."""

from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from zipfile import ZipFile


NS = {
    "main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "rel": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}


def col_to_num(ref: str) -> int:
    match = re.match(r"([A-Z]+)", ref)
    if not match:
        return 0
    num = 0
    for char in match.group(1):
        num = num * 26 + (ord(char) - 64)
    return num


def normalize_text(value: str) -> str:
    cleaned = " ".join((value or "").split())
    replacements = {
        "Laboatorio": "Laboratorio",
        "Clínica / Laboatorio": "Clínica / Laboratorio",
        "Equipamento": "Equipo",
        "Ododontopediatrías": "Odontopediatrías",
        "Pótesis": "Prótesis",
        "cínicas": "clínicas",
    }
    return replacements.get(cleaned, cleaned)


def parse_sheet_rows(xlsx_path: Path) -> list[list[str]]:
    with ZipFile(xlsx_path) as archive:
        shared_strings: list[str] = []
        if "xl/sharedStrings.xml" in archive.namelist():
            root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
            for si in root.findall("main:si", NS):
                shared_strings.append("".join(t.text or "" for t in si.findall(".//main:t", NS)))

        workbook = ET.fromstring(archive.read("xl/workbook.xml"))
        relationships = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
        rel_map = {
            rel.attrib["Id"]: "xl/" + rel.attrib["Target"]
            for rel in relationships
            if rel.attrib.get("Id") and rel.attrib.get("Target")
        }

        first_sheet = workbook.find("main:sheets", NS)[0]
        target = rel_map[first_sheet.attrib["{%s}id" % NS["rel"]]]
        worksheet = ET.fromstring(archive.read(target))

        def cell_value(cell: ET.Element) -> str:
            cell_type = cell.attrib.get("t")
            if cell_type == "inlineStr":
                return "".join(piece.text or "" for piece in cell.findall(".//main:t", NS))
            value = cell.find("main:v", NS)
            if value is None:
                return ""
            raw = value.text or ""
            if cell_type == "s":
                return shared_strings[int(raw)]
            return raw

        rows: list[list[str]] = []
        for row in worksheet.findall(".//main:sheetData/main:row", NS):
            values: dict[int, str] = {}
            for cell in row.findall("main:c", NS):
                idx = col_to_num(cell.attrib.get("r", "A1")) - 1
                values[idx] = cell_value(cell)
            if values:
                max_idx = max(values)
                rows.append([values.get(i, "") for i in range(max_idx + 1)])
        return rows


def build_payload(rows: list[list[str]], source_name: str) -> dict[str, object]:
    headers = rows[0]
    data = rows[1:]
    field_index = {name: idx for idx, name in enumerate(headers)}

    materials = []
    for row in data:
        get = lambda name: normalize_text(row[field_index[name]]) if field_index[name] < len(row) else ""
        material_type = get("Material / Instrumento / Material de reposición periódica")
        semester = get("Semestre")
        midterm = get("Parcial") or "Sin parcial especificado"
        quantity = get("Cantidad aproximada")

        materials.append(
            {
                "id": get("NumeroDeMaterial"),
                "name": get("Material / Instrumento"),
                "suggestedBrand": get("Marcas Sugeridas"),
                "system": get("Sistema"),
                "presentation": get("Presentación"),
                "quantity": quantity,
                "subject": get("Asignatura"),
                "year": get("Año"),
                "semester": semester,
                "midterm": midterm,
                "location": get("Clínica o Laboratorio"),
                "ownership": get("Individual o grupal"),
                "timing": get("Uso inmediato o programado"),
                "type": material_type,
                "purchaseFrequency": get("Compra única o periódica"),
                "otherSubjects": get("Otras Asignaturas de uso"),
                "notes": get("Observaciones"),
                "image": "",
                "studentStatus": "pending",
                "downloadSource": f"./data/{source_name}",
            }
        )

    return {
        "program": "3rd Year Odontology",
        "sheet": "3RDYEARODONTOLOGY",
        "sourceFile": source_name,
        "students": [
            {"id": "student-001", "name": "Andrea Ruiz", "group": "3rd Year Odontology"},
            {"id": "student-002", "name": "Luis Herrera", "group": "3rd Year Odontology"},
            {"id": "student-003", "name": "Camila Soto", "group": "3rd Year Odontology"},
        ],
        "materials": materials,
    }


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: extract_materials.py <input.xlsx> <output.json>")
        return 1

    source = Path(sys.argv[1])
    destination = Path(sys.argv[2])
    rows = parse_sheet_rows(source)
    payload = build_payload(rows, source.name)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {destination}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

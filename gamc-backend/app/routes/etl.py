from fastapi import APIRouter, UploadFile, File
import subprocess
import tempfile
import os

router = APIRouter()

@router.post("/air/upload")
async def upload_air_csv(file: UploadFile = File(...)):
    # guardar csv temporalmente
    temp_path = tempfile.mkstemp(suffix=".csv")[1]
    with open(temp_path, "wb") as f:
        f.write(await file.read())

    # ejecutar el script ETL
    result = subprocess.run(
        ["python", "etl/etl_air.py", temp_path],
        capture_output=True, text=True
    )

    # borrar archivo temporal
    os.remove(temp_path)

    return {
        "stdout": result.stdout,
        "stderr": result.stderr
    }


@router.post("/noise/upload")
async def upload_noise_csv(file: UploadFile = File(...)):
    temp_path = tempfile.mkstemp(suffix=".csv")[1]
    with open(temp_path, "wb") as f:
        f.write(await file.read())

    result = subprocess.run(
        ["python", "etl/etl_noise.py", temp_path],
        capture_output=True, text=True
    )

    os.remove(temp_path)

    return {
        "stdout": result.stdout,
        "stderr": result.stderr
    }


@router.post("/underground/upload")
async def upload_und_csv(file: UploadFile = File(...)):
    temp_path = tempfile.mkstemp(suffix=".csv")[1]
    with open(temp_path, "wb") as f:
        f.write(await file.read())

    result = subprocess.run(
        ["python", "etl/etl_underground.py", temp_path],
        capture_output=True, text=True
    )

    os.remove(temp_path)

    return {
        "stdout": result.stdout,
        "stderr": result.stderr
    }

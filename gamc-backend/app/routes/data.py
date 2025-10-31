from fastapi import APIRouter

router = APIRouter()

@router.get("/stats")
def get_stats():
    return {
        "total_sensores": 120,
        "promedio_temp": 23.7,
        "alertas": 5
    }

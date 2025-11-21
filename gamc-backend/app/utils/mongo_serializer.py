from bson import ObjectId
from datetime import datetime


def serialize_doc(doc):
    """Convierte un documento de Mongo a JSON serializable."""
    if not doc:
        return doc

    doc["_id"] = str(doc["_id"])

    # Convertir datetime a ISO
    if isinstance(doc.get("time"), datetime):
        doc["time"] = doc["time"].isoformat()

    return doc

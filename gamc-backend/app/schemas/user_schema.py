from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    role: str

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str

class UserUpdate(BaseModel):
    full_name: str | None = None
    password: str | None = None
    role: str | None = None

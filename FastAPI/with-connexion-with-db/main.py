
from typing import List
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from crud import create_user, get_user, update_user, delete_user, get_user_by_email, authenticate_user, get_all_users
from schemas import UserCreate, UserBase, UserRead, Token
from uuid import UUID
from dependencies import get_db, get_current_user, require_roles
from fastapi.security import OAuth2PasswordRequestForm
from auth_utils import create_access_token
from database import Base, engine

app = FastAPI()
Base.metadata.create_all(bind=engine)




# Create User
@app.post("/api/v1/users/", response_model=UserBase)
def api_create_user(user: UserCreate, db: Session = Depends(get_db)):
	db_user = create_user(db, user)
	return db_user

# Get User by ID
@app.get("/api/v1/users/{user_id}", response_model=UserBase)
def api_get_user(user_id: UUID, db: Session = Depends(get_db)):
	db_user = get_user(db, user_id)
	if not db_user:
		raise HTTPException(status_code=404, detail="User not found")
	return db_user

# Update User
@app.put("/api/v1/users/{user_id}", response_model=UserBase)
def api_update_user(user_id: UUID, user_update: UserBase, db: Session = Depends(get_db)):
	db_user = update_user(db, user_id, user_update)
	if not db_user:
		raise HTTPException(status_code=404, detail="User not found")
	return db_user

# update my profile - check the user logged-in through token
@app.put("/api/v1/users/me", response_model=UserBase)
def update_my_profile(user_update: UserBase, current_user: UserBase = Depends(get_current_user), db: Session = Depends(get_db)):
    updated_user = update_user(db, current_user.id, user_update)
    return updated_user


# Delete User
@app.delete("/api/v1/users/{user_id}", response_model=UserBase)
def api_delete_user(user_id: UUID, db: Session = Depends(get_db)):
	db_user = delete_user(db, user_id)
	if not db_user:
		raise HTTPException(status_code=404, detail="User not found")
	return db_user


# sign up endpoint
@app.post("/api/v1/auth/register", response_model=UserRead)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
	existing = get_user_by_email(db,user.email)
	if existing:
		raise HTTPException(status_code=400, detail="User already registered")
	new_user = create_user(db,user)
	return new_user

# sign in endpoint
@app.post("/api/v1/auth/signin", response_model = Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)): # Depends() means FastAPI will handle extracting and validating the login form data for you.
	user = authenticate_user(db, form_data.username, form_data.password)
	if not user:
		raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail= "Incorrect Credentials")
	access_token = create_access_token({"sub":str(user.id), "roles":user.roles})
	token = Token(access_token= access_token, token_type= "bearer")
	return token

# Question : WHY use OAuth2 form

# Only admins could see the list of the users
@app.get("/api/v1/users/", response_model=List[UserBase])
def list_users(current_user: UserBase = Depends(get_current_user), db: Session = Depends(get_db)):
    if "admin" not in current_user.roles:
        raise HTTPException(status_code=403, detail="Not authorized")
    return get_all_users(db)

# only admin can delete
@app.delete("/users/{user_id}")
def delete_user_admin(user_id: str, current_user: UserBase = Depends(require_roles("admin"))):
    # only admin can delete
    return {"msg": f"user {user_id} deleted"}
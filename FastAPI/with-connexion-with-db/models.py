from sqlalchemy import Column, ARRAY, String
from sqlalchemy.dialects.postgresql import UUID
import uuid
from database import Base

class User(Base):
    __tablename__ = "users"

    #signin fields
    email = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)


    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    middle_name = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    roles = Column(ARRAY(String), nullable=True)

# we gonna create a class named User , it will model a table called users.
#it inherits Base , which is created using declarative_base(). this tells the SQLArchemy that User is a mapped class , it should be traeted as a table in the database
# as_uuid=True → SQLAlchemy will store it as a Python uuid.UUID object when you read it from the database.If as_uuid=False, it would return it as a string instead.
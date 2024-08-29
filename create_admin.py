from werkzeug.security import generate_password_hash
from app import db, app
from app.models import User

def create_admin_user(nome, senha):
    with app.app_context():
        existing_user = User.query.filter_by(nome=nome).first()
        if existing_user:
            print(f"Usuário com o nome '{nome}' já existe.")
            return

        hashed_password = generate_password_hash(senha)
        new_admin = User(nome=nome, senha=hashed_password, role='admin')

        db.session.add(new_admin)
        db.session.commit()
        print(f"Usuário admin '{nome}' criado com sucesso.")

        users = User.query.all()
        print("\nTodos os usuários:")
        for user in users:
            print(f"ID: {user.id}, Nome: {user.nome}, Role: {user.role}")

if __name__ == "__main__":
    nome = input("Digite o nome do usuário admin: ")
    senha = input("Digite a senha do usuário admin: ")
    create_admin_user(nome, senha)

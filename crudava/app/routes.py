from flask import Flask, request, redirect, url_for, render_template, flash
from flask_login import login_user, logout_user, login_required, current_user
from functools import wraps

from app import app, db
from app.models import User, Turma, Aluno
from werkzeug.security import generate_password_hash, check_password_hash

with app.app_context():
    db.create_all()

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if current_user.role != 'admin':
            return redirect(url_for('/'))
        return f(*args, **kwargs)
    return decorated_function

def professor_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if current_user.role != 'professor':
            return redirect(url_for('/'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
@login_required
def index():
    if current_user.is_authenticated:
        print(f'Usuário autenticado: {current_user.id}')
    else:
        print('Usuário não autenticado')
    
    if current_user.role == 'admin':
        professores = User.query.filter_by(role='professor').all()
        return render_template('dashboard-admin.html', professors=professores, user_name=current_user.nome)
    elif current_user.role == 'professor':
        turmas = Turma.query.all()
        alunos = Aluno.query.all()
        return render_template('dashboard-professor.html', turmas=turmas, alunos=alunos, user_name=current_user.nome)
    else:
        return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        id = request.form['id']
        senha = request.form['senha']
        
        user = User.query.filter_by(id=id).first()
        if user and check_password_hash(user.senha, senha):
            login_user(user)
            return redirect(url_for('index'))
        else:
            flash('Login inválido. Verifique suas credenciais.', 'danger')
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/add_turma', methods=['GET', 'POST'])
def add_turma():
    if request.method == 'POST':
        nome = request.form['nome']
        nova_turma = Turma(nome=nome)
        db.session.add(nova_turma)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('add_class.html')

@app.route('/add_aluno', methods=['GET', 'POST'])
@login_required
@professor_required
def add_aluno():
    if request.method == 'POST':
        nome = request.form['nome']
        turma_id = request.form['turma_id']
        novo_aluno = Aluno(nome=nome, turma_id=turma_id)
        db.session.add(novo_aluno)
        db.session.commit()
        return redirect(url_for('index'))
    turmas = Turma.query.all()
    return render_template('add_student.html', turmas=turmas)

@app.route('/add_professor', methods=['GET', 'POST'])
@login_required
@admin_required
def add_professor():
    if request.method == 'POST':
        nome = request.form['nome']
        senha = generate_password_hash(request.form['senha'])
        new_user = User(nome=nome, senha=senha, role='professor')
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('add_professor.html')

@app.route('/edit_turma/<int:id>', methods=['GET', 'POST'])
@login_required
@professor_required
def edit_turma(id):
    turma = Turma.query.get_or_404(id)
    if request.method == 'POST':
        turma.nome = request.form['nome']
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('edit_class.html', turma=turma)

@app.route('/edit_aluno/<int:id>', methods=['GET', 'POST'])
@login_required
@professor_required
def edit_aluno(id):
    aluno = Aluno.query.get_or_404(id)
    if request.method == 'POST':
        aluno.nome = request.form['nome']
        aluno.turma_id = request.form['turma_id']
        db.session.commit()
        return redirect(url_for('index'))
    turmas = Turma.query.all()
    return render_template('edit_student.html', aluno=aluno, turmas=turmas)

@app.route('/edit_professor/<int:professor_id>', methods=['GET', 'POST'])
@login_required
@admin_required
def edit_professor(professor_id):
    professor = User.query.get_or_404(professor_id)
    
    if professor.role != 'professor':
        flash('Usuário não encontrado.')
        return redirect(url_for('index'))

    if request.method == 'POST':
        professor.nome = request.form['nome']
        senha = request.form.get('senha')
        if senha:
            professor.senha = generate_password_hash(senha)
        db.session.commit()
        return redirect(url_for('index'))

    return render_template('edit_professor.html', professor=professor)

@app.route('/delete_turma/<int:id>')
@login_required
@professor_required
def delete_turma(id):
    turma = Turma.query.get_or_404(id)
    alunos = Aluno.query.filter_by(turma_id=id).all()

    for aluno in alunos:
        db.session.delete(aluno)

    db.session.delete(turma)
    db.session.commit()
    return redirect(url_for('index'))

"""
# Here i change the turma_id to NULL and don't delete then
@app.route('/delete_turma/<int:id>', methods=['GET'])
def delete_turma(id):
    turma = Turma.query.get_or_404(id)
    alunos = Aluno.query.filter_by(turma_id=id).all()

    for aluno in alunos:
        aluno.turma_id = None

    db.session.delete(turma)
    db.session.commit()
    return redirect(url_for('index'))
"""

@app.route('/delete_aluno/<int:id>')
@login_required
@professor_required
def delete_aluno(id):
    aluno = Aluno.query.get_or_404(id)
    db.session.delete(aluno)
    db.session.commit()
    return redirect(url_for('index'))

@app.route('/delete_professor/<int:professor_id>')
@login_required
@admin_required
def delete_professor(professor_id):
    professor = User.query.get_or_404(professor_id)
    if professor.role != 'professor':
        return redirect(url_for('index'))

    db.session.delete(professor)
    db.session.commit()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
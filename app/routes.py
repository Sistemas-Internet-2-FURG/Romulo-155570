from flask import Flask, request, redirect, url_for, render_template

from app import app, db
from app.models import Turma, Aluno

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    turmas = Turma.query.all()
    alunos = Aluno.query.all()
    return render_template('index.html', turmas=turmas, alunos=alunos)

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

@app.route('/edit_turma/<int:id>', methods=['GET', 'POST'])
def edit_turma(id):
    turma = Turma.query.get_or_404(id)
    if request.method == 'POST':
        turma.nome = request.form['nome']
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('edit_class.html', turma=turma)

@app.route('/edit_aluno/<int:id>', methods=['GET', 'POST'])
def edit_aluno(id):
    aluno = Aluno.query.get_or_404(id)
    if request.method == 'POST':
        aluno.nome = request.form['nome']
        aluno.turma_id = request.form['turma_id']
        db.session.commit()
        return redirect(url_for('index'))
    turmas = Turma.query.all()
    return render_template('edit_student.html', aluno=aluno, turmas=turmas)

@app.route('/delete_turma/<int:id>')
def delete_turma(id):
    turma = Turma.query.get_or_404(id)
    db.session.delete(turma)
    db.session.commit()
    return redirect(url_for('index'))

@app.route('/delete_aluno/<int:id>')
def delete_aluno(id):
    aluno = Aluno.query.get_or_404(id)
    db.session.delete(aluno)
    db.session.commit()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
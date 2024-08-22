from app import db

class Turma(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    alunos = db.relationship('Aluno', backref='turma', lazy=True)
    # I also can do a cascade here
    # alunos = db.relationship('Aluno', backref='turma', cascade='all, delete-orphan')

class Aluno(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    turma_id = db.Column(db.Integer, db.ForeignKey('turma.id'), nullable=False)
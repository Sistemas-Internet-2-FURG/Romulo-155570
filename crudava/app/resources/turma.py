from flask_restful import Resource, reqparse
from app import db
from models import Turma

turma_parser = reqparse.RequestParser()
turma_parser.add_argument('nome', type=str, required=True, help="Nome da turma é obrigatório")

class TurmaResource(Resource):
    def get(self, id):
        turma = Turma.query.get_or_404(id)
        return {'id': turma.id, 'nome': turma.nome, 'alunos': [aluno.id for aluno in turma.alunos]}

    def put(self, id):
        args = turma_parser.parse_args()
        turma = Turma.query.get_or_404(id)
        turma.nome = args['nome']
        db.session.commit()
        return {'message': 'Turma atualizada com sucesso'}

    def delete(self, id):
        turma = Turma.query.get_or_404(id)
        db.session.delete(turma)
        db.session.commit()
        return {'message': 'Turma excluída com sucesso'}

class TurmaListResource(Resource):
    def get(self):
        turmas = Turma.query.all()
        return [{'id': turma.id, 'nome': turma.nome} for turma in turmas]

    def post(self):
        args = turma_parser.parse_args()
        turma = Turma(nome=args['nome'])
        db.session.add(turma)
        db.session.commit()
        return {'message': 'Turma criada com sucesso', 'id': turma.id}

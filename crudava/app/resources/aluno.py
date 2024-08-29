from flask_restful import Resource, reqparse
from app import db
from models import Aluno

aluno_parser = reqparse.RequestParser()
aluno_parser.add_argument('nome', type=str, required=True, help="Nome do aluno é obrigatório")
aluno_parser.add_argument('turma_id', type=int, required=True, help="ID da turma é obrigatório")

class AlunoResource(Resource):
    def get(self, id):
        aluno = Aluno.query.get_or_404(id)
        return {'id': aluno.id, 'nome': aluno.nome, 'turma_id': aluno.turma_id}

    def put(self, id):
        args = aluno_parser.parse_args()
        aluno = Aluno.query.get_or_404(id)
        aluno.nome = args['nome']
        aluno.turma_id = args['turma_id']
        db.session.commit()
        return {'message': 'Aluno atualizado com sucesso'}

    def delete(self, id):
        aluno = Aluno.query.get_or_404(id)
        db.session.delete(aluno)
        db.session.commit()
        return {'message': 'Aluno excluído com sucesso'}

class AlunoListResource(Resource):
    def get(self):
        alunos = Aluno.query.all()
        return [{'id': aluno.id, 'nome': aluno.nome, 'turma_id': aluno.turma_id} for aluno in alunos]

    def post(self):
        args = aluno_parser.parse_args()
        aluno = Aluno(nome=args['nome'], turma_id=args['turma_id'])
        db.session.add(aluno)
        db.session.commit()
        return {'message': 'Aluno criado com sucesso', 'id': aluno.id}

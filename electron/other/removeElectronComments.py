# Read TESTE_BRENO.js and TESTE_BRENO.jsx and delete code between //START_ELECTRON and //END_ELECTRON

import os
import shutil

### Função para criar cópia da pasta modificada

def walk(dirname, novo_dirname):
	os.mkdir(novo_dirname)
	for name in os.listdir(dirname):
		path = os.path.join(dirname, name)
		novo_path = novo_pathh(path, dirname = dirname, novo_dirname = novo_dirname)
		if os.path.isfile(path) and not ext(name):
			shutil.copyfile(path, novo_path)
		elif os.path.isfile(path) and ext(name):
			linhas_novo_arquivo = mod(path)
			novo_arquivo = open(novo_path,'w')
			novo_arquivo.writelines(linhas_novo_arquivo)
			novo_arquivo.close()
		elif name=='node_modules' or name=='electron':
			continue
		else:	
			walk(path, novo_path)

## Funcao que verifica se a extensao e js ou jsx

def ext(name):
	segue = False
	ponto = name.find('.') + 1
	extensao = name[ponto:]
	if (extensao=='js') or (extensao=='jsx'):
		segue = True
	return segue

## Função para fazer um novo path

def novo_pathh(path, dirname, novo_dirname):
	local_novo_dirname = path.find(dirname) + 1
	novo_path = os.path.join(novo_dirname,path[local_novo_dirname+len(dirname):])
	return novo_path

## Função para modificar um arquivo e retornar as linhas do arquivo modificado

def mod(arq):
	arquivo = open(arq,'r')
	linhas_arquivo = arquivo.readlines()
	linhas_novo_arquivo = []

	interruptor = 1
	for linha in linhas_arquivo:
		if linha.find("// START_ELECTRON") != -1 or linha.find("//START_ELECTRON") != -1:
			interruptor = 0
			continue
		elif linha.find("// END_ELECTRON")!= -1 or linha.find("//END_ELECTRON") != -1:
			interruptor = 1
			continue
		if interruptor == 1:
			linhas_novo_arquivo.append(linha)

	arquivo.close()
	return linhas_novo_arquivo

# Chama-lhe a funcao
# walk( putYourDirNameHere, putYourNewDirNameHere);

#Referências:
#https://www.treinaweb.com.br/blog/manipulando-arquivos-com-python/
#http://devfuria.com.br/python/receitas-para-manipular-arquivos-de-texto/
#https://pt.stackoverflow.com/questions/2823/como-checar-se-um-arquivo-existe-usando-python
#https://pense-python.caravela.club/14-arquivos/04-nomes-de-arquivo-e-caminhos.html
#https://pythonhelp.wordpress.com/2011/11/12/fatiamento-slicing-de-strings-em-python/
#https://www.geeksforgeeks.org/create-a-directory-in-python/


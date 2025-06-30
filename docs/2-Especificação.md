# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

O objetivo desta seção é definir a solução proposta para a Santos Bolos e Doces, a partir da perspectiva dos usuários. O sistema deve atender às necessidades dos clientes, garantindo uma experiência de compra eficiente, clara e personalizada. Para isso, será elaborado um conjunto de personas, histórias de usuários, requisitos funcionais e não funcionais, além das restrições do projeto.

Para a especificação do projeto da Santos Bolos e Doces, a equipe utilizou um conjunto de ferramentas que permitiram uma abordagem completa e colaborativa. O Canva foi empregado para a criação visual de personas e wireframes, facilitando a compreensão do perfil dos usuários e a visualização da interface do sistema. O Camunda auxiliou na modelagem e automação do fluxo de compra, otimizando o processo para os clientes. O Discord serviu como plataforma de comunicação para a equipe, promovendo a troca de ideias e a tomada de decisões em tempo real. Por fim, o Google Docs foi utilizado para a criação e edição colaborativa da documentação do projeto, garantindo a consistência e o acesso às informações por todos os membros da equipe.

## Personas

Persona 1

Eduarda Magalhães tem 26 anos e é contadora. Eduarda sempre encomenda doces para festas em família, pois adora organizar essas comemorações. Além de gostar de consumir produtos não industrializados e de alta qualidade. Está buscando um comércio que a ajude com tais produtos.

Persona 2 

Ana Souza tem 20 anos e é estudante. Ana adora doces artesanais e costuma comprar para se presentear e também para compartilhar com amigos em pequenas comemorações. Como estudante, ela busca praticidade, preços acessíveis e um sistema que facilite suas compras.

Persona 3

Jailson Pereira tem 45 anos e é pedreiro. Jailson é um pedreiro dedicado e pai de Maria, de 8 anos. Ele quer surpreender a filha com um bolo personalizado e de qualidade para seu aniversário, refletindo o tema de sua personagem favorita. Busca uma confeitaria que ofereça opções criativas, preços acessíveis e entrega no prazo, para tornar a festa da filha inesquecível.

Persona 4

Felipe Gomes tem 25 anos e é analista de TI. Felipe adora surpreender o namorado com doces personalizados em datas especiais, mas tem uma rotina corrida e precisa de um sistema prático para fazer seus pedidos. Ele valoriza um bom atendimento e opções de entrega rápida. 




Persona 5

 Helena Fernandes tem 72 anos e é aposentada. Dona Helena adora comprar doces para seus netos e familiares nos fins de semana. Ela prefere um atendimento humanizado e opções de compra simples, já que não tem muita experiência com tecnologia.


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Cliente             | Visualizar opções de bolos e doces | Escolher o produto ideal para eventos ou presentes.|
|Cliente             | Personalizar um bolo com um tema específico | 	Tornar o evento mais especial e único. |
|Cliente             | Filtrar produtos por preço e tamanho | Encontrar doces que caibam no meu orçamento.|
|Cliente             | Realizar pagamentos de forma segura e rápida | Garantir que minha encomenda seja confirmada sem problemas. |
|Proprietária        | Gerenciar o catálogo de produtos | Manter as opções atualizadas e atraentes para os clientes.|
|Proprietária        | Acompanhar o status dos pagamentos | Evitar problemas financeiros e garantir o recebimento. |
|Proprietária        | Comunicar-se com os clientes em caso de dúvidas | Oferecer um atendimento personalizado e resolver problemas rapidamente. |
|Proprietária        | Receber notificações de novos pedidos | Organizar a produção de forma eficiente. |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário realize cadastro | ALTA | 
|RF-002| Permitir que o usuário realize pedidos por meio do cardápio   | ALTA |
|RF-003| Emitir um relatório de pedidos   | ALTA |
|RF-004| Disponibilizar detalhes de cada produto do cardápio para o usuário   | ALTA |
|RF-005| Armazenar informações dos clientes para facilitar pedidos   | MÉDIA |
|RF-006| Disponibilizar histórico de pedidos para o usuário   | MÉDIA |
|RF-007| Permitir que o cliente acompanhe o status do pedido   | BAIXA |
|RF-008| Implementar filtros e busca por produtos   | BAIXA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ter uma interface fácil e intuitiva | ALTA | 
|RNF-002| O sistema deve ter alta disponibilidade |  MÉDIA |
|RNF-003| O sistema deve ser responsivo, permitindo o uso em celulares e computadores |  MÉDIA | 
|RNF-004| O sistema deve garantir segurança dos dados dos clientes |  MÉDIA | 


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Limite diário de pedidos que podem ser atendidos
|03| Restrição na quantidade de produtos oferecidos para evitar desperdício|

      |



> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

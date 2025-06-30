### 3.3.1 Processo 1 – Santos Bolos e Doces AS-IS

O modelo Santos Bolos e Doces AS-IS tem como sua principal oportunidade de melhoria justamente automatizar e digitalizar essas etapas. A dependência quase exclusiva do atendimento via WhatsApp limita o crescimento do negócio, além de tornar os processos manuais, repetitivos e sujeitos a erros.

![Diagrama Santos Bolos e Doces AS-IS](https://github.com/user-attachments/assets/a8f98832-d002-4d5e-8f18-6bc389d4d77d)

#### Detalhamento das atividades






| **#**      | **Atividade**         | **Propriedade**	 |**Tipo de Dado**|
| ---        | ---                   | ---               | ---            |
|  1         | Cliente entra em contato via WhatsApp     |Mensagem enviada|        Área de texto        |
|            ||Data e hora do contato	|Data e Hora|
|  2         |	  Proprietário recebe a mensagem	     |    Mensagem recebida        |	Área de texto|
|||Contato do cliente|	Caixa de texto|
|||Data e hora de recebimento|Data e Hora|
|3|	Proprietário apresenta produtos e valores|	Lista de produtos enviados|	Seleção múltipla
|||Imagem dos produtos (se aplicável)|	Imagem
|||Tabela de preços|	Tabela
|||Link para catálogo (opcional)|	Link
|||Mensagem de apresentação	|Área de texto
|4|	Cliente decide se irá comprar|	Decisão do cliente|	Seleção única
|||Motivo da desistência (se aplicável)|	Área de texto
|||Data e hora da resposta|	Data e Hora
|5|	Cliente escolhe o produto|	Produto selecionado	|Seleção única
|||Personalizações desejadas	|Área de texto
|||Imagem de referência (se houver)	|Imagem
|||Data desejada para entrega/retirada|	Data
|||Hora aproximada para retirada|	Hora
|6|	Proprietário registra o pedido e produz|	Nome do cliente|	Caixa de texto
|||Produto solicitado	|Caixa de texto
|||Detalhes do pedido|	Área de texto
|||Data e hora do pedido|	Data e Hora
|||Status do pedido|	Seleção única
|7|	Proprietário avisa cliente (pedido pronto)|	Mensagem de aviso enviada|	Área de texto
|||Data e hora do aviso|	Data e Hora|
|8|	Cliente realiza pagamento via PIX|	Comprovante de pagamento|	Arquivo
|||Valor pago	|Número
|||Data e hora do pagamento|	Data e Hora
|9|	Cliente busca o pedido|	Data da retirada|	Data
|||Hora da retirada|	Hora
|10|	Cliente não busca o pedido (alternativa)|	Tentativa de revenda?|	Seleção única
|||Novo comprador (se houver)|	Caixa de texto
|||Status final do produto|	Seleção única

---

**Atividade 1: Cliente entra em contato via WhatsApp**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|Mensagem_inicial |Área de Texto     |Máximo de 500 caracteres|           |
|Data_contato     |Data              | Obrigatório    |   Data atual      |
|Hora_contato     |Hora              |Obrigatório     |Hora atual         | 


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  )|
| Enviar               | Atividade 2 (Receber mensagem) | default           |
| Cancelar             | Fim do processo                |      cancel       |


---

**Atividade 2: Proprietário recebe a mensagem**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|Mensagem_recebida| Área de Texto    |Somente leitura (cliente)|          |
|Nome_cliente     |  Caixa de Texto	 |Obrigatório     |                   |
|Telefone_cliente|   Caixa de Texto	 |Formato (##) #####-####	|           |
|Data_recebimento|   Data            |Preenchido automaticamente|Data atual|
|Hora_recebimento|   Hora            |Preenchido automaticamente|Hora atual|


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/) |
| Apresentar_produtos  | Atividade 3 (Apresentar Produtos)|    default      |
|encerrar              |Fim do processo                 |      default      |


---

**Atividade 3: Proprietário apresenta produtos e valores**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|Produtos_disponíveis| Seleção múltipla    |Lista definida de produtos|          |
|Tabela_preços     |  Tabela	 |Deve conter: Produto, Tamanho, Valor     |                   |
|Imagem_produtos|   Imagem	 |Opcional	|           |
|link_catalogo|   Link         |Opcional (URL válida)	||
|Mensagem_apresentacao|   Área de Texto	            |Máximo 300 caracteres	||


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/) |
| Enviar_catálogo  | Atividade 4 (Cliente decide a comprar)|    default     |
|encerrar              |Fim do processo                 |      default      |


---

**Atividade 4: Cliente decide se irá comprar**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|decisao_compra| Seleção única	    |Opções: Sim / Não	|          |
|motivo_desistencia	     |  Área de Texto		 |Obrigatório se a decisão for "Não"	    ||
|data_decisao|   Data	 |Preenchimento automático		|    Data atual       |
|hora_decisao|   Hora         |Preenchimento automático		|Hora atual|


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/) |
| continuar_pedido  | Atividade 5 (Cliente escolhe produto)	|    default     |
| cancelar              |Fim do processo                 |      default      |


---

**Atividade 5: Cliente escolhe o produto**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|produto_selecionado| Seleção única	    |Obrigatório	|          |
|personalizacoes	     |  Área de Texto		 |Opcional, máximo de 300 caracteres		    ||
|imagem_referencia|   Imagem	 |Opcional		|           |
|data_entrega_retirada|   Data         |Deve ser igual ou superior à data atual			||
|hora_retirada_aproximada|Hora|Opcional||


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/) |
| confirmar_pedido  |Atividade 6 (Registrar e produzir pedido)		|    default     |
| cancelar              |Fim do processo                 |      cancel      |


---

**Atividade 6: Proprietário registra o pedido e inicia produção**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|Detalhes_pedido| Área de Texto    |Opcional (personalizações ou observações)	|          |
|Nome_cliente     |  Caixa de Texto	 |Obrigatório     |                   |
|Produto_solicitado|   Caixa de Texto	 |Obrigatório	|           |
|data_hora_pedido|   Data e Hora	            |Preenchido automaticamente|Data e hora atual|
|status_pedido|   Seleção única	            |Opções: Aguardando, Produção, Pronto	|Aguardando|


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/) |
| iniciar_producao  |Atividade 7 (Avisar cliente)		|    default     |
| cancelar              |Fim do processo                 |      cancel      |


---

**Atividade 7: Proprietário avisa cliente que pedido está pronto**
| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|mensagem_aviso| Área de Texto    |Mensagem padrão ou personalizada		|      "Seu pedido está pronto!"|
|data_hora_aviso     |  Data e Hora		 |Preenchimento automático	     |         Data e hora atual          |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/) |
| notificar_cliente  |Atividade 8 (Cliente realiza pagamento)		|    default     |


---

**Atividade 8: Cliente realiza pagamento via PIX**
| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|comprovante_pagamento|Arquivo    |Obrigatório (formato imagem ou PDF)		||
|valor_pago	      |  Número	         |Maior que 0	    |  Data e hora atual|
|data_pagamento|Data	|Obrigatório||
|hora_pagamento|Hora|Obrigatório||


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/) |
| confirmar_pagamento  |Atividade 9 (Cliente busca pedido)|    default      |


---

**Atividade 9: Cliente busca o pedido**
| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|data_retirada    |      Data        |Obrigatório 	  |    Data atual     |
|hora_retirada	  |  Hora	           |Obrigatório	    |    Hora atual     |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/) |
| finalizar_pedido     |Fim do processo			            |    default        |


---

**Atividade 10: Cliente não busca o pedido (alternativa)**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|tentativa_revenda|Seleção única	   |Opções: Sim / Não	 	||
|novo_comprador		     |  Caixa de Texto		 |Obrigatório se revenda = Sim		     ||
|status_final_produto|Seleção única	|Opções: Revendido / Consumido / Desperdiçado	||

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/) |
| Encerrar             |Fim do processo	            		|    default        |


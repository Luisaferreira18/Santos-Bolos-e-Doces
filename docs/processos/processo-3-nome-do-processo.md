### 3.3.3 Processo 2 – Preparação do Pedido AS-IS
Este diagrama representa o processo de produção do pedido (AS-IS) da empresa Santos Bolos e Doces, focando nas atividades realizadas pelo Proprietário após o recebimento de um pedido via WhatsApp. O modelo está estruturado em notação BPMN e dividido em duas raias: Cliente e Proprietário.

O processo começa com o Cliente fazendo o pedido por WhatsApp. O Proprietário recebe o pedido e o registra manualmente em um caderno. Em seguida, verifica a disponibilidade dos ingredientes necessários para produzir o item solicitado.

Neste ponto, há uma decisão: “Tem os ingredientes?”

Se sim, o proprietário inicia a preparação.

Se não, realiza a compra dos ingredientes e só então começa a preparação.

A sequência de produção segue as seguintes etapas:

Preparar a massa

Assar o produto

Esperar o resfriamento

Realizar o recheio e a montagem

Aplicar a decoração

Embalagem do produto

Finalização do pedido

Após a finalização, o proprietário envia uma notificação ao cliente informando que o produto está pronto. O cliente então recebe a mensagem, encerrando o processo.

Este fluxo mostra um processo bastante manual, com atividades como o registro em caderno e a verificação manual de insumos, além da comunicação com o cliente sendo feita exclusivamente por WhatsApp. Ele oferece oportunidades claras de automação e digitalização, como o uso de sistemas de gestão de pedidos, controle de estoque e envio automático de notificações.

---

![Processo de Pedido AS-Is](https://github.com/user-attachments/assets/d270844b-9019-4120-ab94-244e023664f3)

---

#### Detalhamento das atividades

| **#**      | **Atividade**         | **Propriedade**	 |**Tipo de Dado**|
| ---             | ---              | ---            | ---               |
| 1        | Cliente faz pedido via WhatsApp		| Mensagem enviada	               | Área de texto|
|||Data e hora do contato	|Data e Hora|
|2|Proprietário recebe o pedido	|Mensagem recebida	|Área de texto|
|||Contato do cliente	|Caixa de texto|
|||Data e hora de recebimento	|Data e Hora|
|3|Proprietário registra o pedido no caderno	|Nome do cliente	|Caixa de texto|
|||Produto solicitado	|Caixa de texto|
|||Detalhes do pedido	|Área de texto|
|||Data e hora do pedido	|Data e Hora|
|||Status do pedido	|Seleção única|
|4|Verifica disponibilidade dos ingredientes	|Lista de ingredientes verificados	|Lista de texto|
|||Status da disponibilidade	|Seleção única (Sim/Não)|
|5|Comprar os ingredientes (se necessário)	|Itens comprados	|Lista de texto|
|||Data da compra	|Data|
|||Valor gasto	|Número|
|6|Iniciar a preparação	|Início de preparo	|Data e Hora|
|7|Preparar a massa	|Tipo de massa	|Caixa de texto|
|8|Assar o produto	|Tempo de forno	|Número (minutos)|
|||Temperatura|Número (°C)|
|9|Esperar o resfriamento	|Tempo de resfriamento	|Número (minutos)|
|10|Realizar recheio e montagem	|Tipo de recheio	|Caixa de texto|
|||Ordem da montagem	|Área de texto|
|11|Aplicar decoração	|Tipo de decoração	|Seleção única|
|||Itens decorativos utilizados	|Lista de texto|
|12|Embalar produto	|Tipo de embalagem	|Seleção única|
|||Observações na embalagem	|Área de texto|
|13|Finalizar pedido	|Status final	|Seleção única|
|14|Enviar notificação ao cliente	|Mensagem de aviso enviada	|Área de texto|
|||Data e hora do aviso	|Data e Hora|
|15|Cliente recebe mensagem	|Confirmação de recebimento	|Seleção única|
|||Data e hora da confirmação	|Data e Hora|

---


**Atividade 1: Cliente faz pedido via WhatsApp**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Mensagem_inicial|Área de Texto	|Máximo de 500 caracteres	||
|Data_contato|Data|Obrigatório|Data atual|
|Hora_contato	|Hora|Obrigatório|Hora atual|


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Enviar|Atividade 2 (Receber o pedido)	|default|
|Cancelar|Fim do processo	|cancel|
---

**Atividade 2: Proprietário recebe o pedido**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Mensagem_recebida|Área de Texto	|Obrigatório||
|Contato_cliente|Caixa de texto	|Obrigatório||
|Data_recebimento|Data|Obrigatório|Data atual|
|Hora_recebimento|Hora|Obrigatório|Hora atual|



| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Continuar|Atividade 3 (Registrar pedido)	|default|
---

**Atividade 3: Proprietário registra o pedido no caderno**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Nome_cliente|Caixa de texto	|Obrigatório||
|Produto_solicitado|Caixa de texto	|Obrigatório||
|Detalhes_pedido|Área de texto	|Máximo 500 caracteres	||
|Data_pedido|Data|Obrigatório|Data atual|
|Hora_pedido|Hora|Obrigatório|Hora atual|
|Status_pedido	|Seleção única	|Obrigatório	|Em preparação|

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Avançar|Atividade 4 (Verificar ingredientes)	|default|
---

**Atividade 4: Verifica disponibilidade dos ingredientes**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Ingredientes_verificados|Lista de texto	|Obrigatório|
|Disponibilidade|Seleção única	|Obrigatório|Sim/Não|


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Sim|Atividade 6 (Começar preparação)	|default|
|Não|Atividade 5 (Comprar ingredientes)	||
---

**Atividade 5: Comprar os ingredientes**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Itens_comprados|Lista de texto	|Obrigatório|
|Data_compra|Data|Obrigatório|Data atual|
|Valor_gasto|Número|||

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Continuar|Atividade 6 (Começar preparação)	|default|
---

**Atividade 6: Começar a preparação**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Inicio_preparo|Data e Hora	|Obrigatório|Data/Hora atual|


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Próximo|Atividade 7 (Preparar massa)	|default|
---

**Atividade 7: Preparar a massa**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Tipo_massa|Caixa de texto	|Obrigatório||

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Avançar|Atividade 8 (Assar produto)	|default||
---

**Atividade 8: Assar o produto**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Tempo_forno|Número|Min 1	||
|Temperatura_forno|Número|Min 100	||

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Próximo|Atividade 9 (Esperar resfriamento)	|default|
---

**Atividade 9: Esperar o resfriamento**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Tempo_resfriamento|Número|Min 1	||

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Próximo|Atividade 10 (Recheio e montagem)	|default|
---

**Atividade 10: Realizar recheio e montagem**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Tipo_recheio|Caixa de texto	|||
|Detalhes_montagem|Área de texto	|||

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Avançar|Atividade 11 (Aplicar decoração)	|default|
---

**Atividade 11: Aplicar decoração**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Tipo_decoracao|Seleção única	|Obrigatório||
|Itens_decorativos|Lista de texto	|||

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Próximo|Atividade 12 (Embalagem)	|default|
---

**Atividade 12: Embalar produto**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Tipo_embalagem|Seleção única	|Obrigatório||
|Observacoes_embalagem|Área de texto	|||

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Avançar|Atividade 13 (Finalizar pedido)	|default|
---

**Atividade 13: Finalizar pedido**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Status_final|Seleção única	|Obrigatório|Pronto para entrega|

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Enviar aviso	|Atividade 14 (Enviar notificação)	|default|
---

**Atividade 14: Enviar notificação ao cliente**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Mensagem_aviso|Área de texto	|Obrigatório||
|Data_aviso|Data|Obrigatório|Data atual|
|Hora_aviso|Hora|Obrigatório|Hora atual|

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Enviar|Atividade 15 (Cliente recebe msg)	|default|
---

**Atividade 15: Cliente recebe mensagem**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Confirmacao_recebimento|Seleção única	|Obrigatório|Sim/Não|
|Data_confirmacao|Data|Data atual|
|Hora_confirmacao|Hora|Hora atual|

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Encerrar|Fim do processo	|default|

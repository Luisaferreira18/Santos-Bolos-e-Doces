### 3.3.4 Processo 2 – Preparação do Pedido TO-BE

O modelo Santos Bolos e Doces TO-BE incorpora automações essenciais no processo de pedidos, como o acesso ao site, verificação de cadastro, login ou realização de cadastro, escolha de produtos, envio e recepção de pedidos, contato via WhatsApp para personalização, verificação e aquisição de ingredientes, geração de ficha técnica, preparação e finalização do produto, envio de notificações ao cliente e entrega. Essas etapas estruturadas otimizam o fluxo de trabalho e oferecem maior integração e eficiência ao sistema.

![image](https://github.com/user-attachments/assets/7dd353d3-2ef0-493e-b5d1-dc778f14a414)


#### Detalhamento das atividades

| #    | Atividade                | Propriedade                       | Tipo de Dado             |
|------|---------------------------|------------------------------------|--------------------------|
| 1    | Acessar o site            | É cadastrado?                     | Decisão (Sim/Não)        |
|      |                           | Se não, realiza o cadastro        | Formulário interativo    |
| 2    | Escolher o produto        | Produtos disponíveis              | Lista dinâmica           |
| 3    | Fazer o pedido            | Pedido realizado pelo site        | Confirmação              |
| 4    | Enviar o pedido           | Envio do pedido                   | Notificação              |
| 5    | Receber o pedido          | Pedido recebido                   | Status atualizado        |
| 6    | Entrar em contato         | Via WhatsApp                      | Link de contato          |
|      |                           | Se respondeu, discutir personalização | Mensagem interativa |
|      |                           | Se não, finaliza                  | Decisão                  |
| 7    | Verificar ingredientes    | Possui todos os ingredientes?     | Decisão (Sim/Não)        |
|      |                           | Se não, realizar compra           | Ação                     |
|      |                           | Se sim, adicionar à fila de produção | Atualização automática |
| 8    | Gerar ficha técnica       | Incluir ingredientes e instruções | Documento gerado         |
| 9    | Preparar produto          | Produção iniciada                 | Status atualizado        |
| 10   | Finalizar produto         | Produto finalizado                | Confirmação              |
| 11   | Enviar notificação        | Cliente informado                 | Notificação automática   |
| 12   | Receber mensagem          | Mensagem do cliente               | Comunicação              |
| 13   | Finalizar processo        | Processo concluído                | Confirmação final        |


---

### Atividade 1 – Acessar o site

| **Campo**        | **Tipo**     | **Restrições**             | **Valor default** |
|------------------|--------------|-----------------------------|-------------------|
| Data_acesso      | Data         | Preenchimento automático    | Data atual        |
| Hora_acesso      | Hora         | Preenchimento automático    | Hora atual        |

| **Comando**   | **Próxima atividade**              |
|--------------|-------------------------------------|
| acessar      | Atividade 2 – Verificar cadastro    |


---

### Atividade 2 – Verificar cadastro no site

| **Campo**           | **Tipo**       | **Restrições**       | **Valor default** |
|---------------------|----------------|-----------------------|-------------------|
| Usuario_cadastrado  | Seleção única  | Opções: Sim / Não     | -                 |

| **Comando**       | **Próxima atividade**               |
|-------------------|--------------------------------------|
| sim_cadastrado    | Atividade 3 – Fazer login            |
| nao_cadastrado    | Atividade 4 – Realizar cadastro      |


---

### Atividade 3 – Fazer login

| **Campo** | **Tipo**       | **Restrições**        | **Valor default** |
|-----------|----------------|------------------------|-------------------|
| Email     | Caixa de texto | Obrigatório            | -                 |
| Senha     | Senha          | Obrigatório            | -                 |

| **Comando** | **Próxima atividade**              |
|-------------|-------------------------------------|
| entrar      | Atividade 5 – Escolher produtos     |


---

### Atividade 4 – Realizar cadastro

| **Campo**       | **Tipo**        | **Restrições**               | **Valor default** |
|------------------|------------------|------------------------------|-------------------|
| Nome_completo    | Caixa de texto   | Obrigatório                  | -                 |
| Email            | Caixa de texto   | Obrigatório (formato e-mail) | -                 |
| Telefone         | Caixa de texto   | Formato: (##) #####-####     | -                 |
| Senha            | Senha            | Mínimo 6 caracteres          | -                 |

| **Comando**  | **Próxima atividade**           |
|--------------|----------------------------------|
| cadastrar    | Atividade 3 – Fazer login        |


---

### Atividade 5 – Escolher produtos

| **Campo**           | **Tipo**          | **Restrições**      | **Valor default** |
|---------------------|-------------------|----------------------|-------------------|
| Produtos_escolhidos | Seleção múltipla  | Pelo menos 1 item    | -                 |

| **Comando**  | **Próxima atividade**                     |
|--------------|--------------------------------------------|
| continuar    | Atividade 6 – Fazer o pedido               |


---

### Atividade 6 – Fazer o pedido

| **Campo**           | **Tipo**       | **Restrições**      | **Valor default** |
|---------------------|----------------|----------------------|-------------------|
| Pedido_confirmado   | Caixa de seleção | Obrigatório         | -                 |

| **Comando**  | **Próxima atividade**               |
|--------------|--------------------------------------|
| enviar       | Atividade 7 – Enviar o pedido        |


---

### Atividade 7 – Enviar o pedido

| **Campo**        | **Tipo**       | **Restrições**             | **Valor default** |
|------------------|----------------|-----------------------------|-------------------|
| Pedido_enviado   | Confirmação    | Status obrigatório         | -                 |

| **Comando**  | **Próxima atividade**                   |
|--------------|------------------------------------------|
| confirmar    | Atividade 8 – Receber pedido             |


---

### Atividade 8 – Receber pedido

| **Campo**        | **Tipo**           | **Restrições**             | **Valor default** |
|------------------|---------------------|-----------------------------|-------------------|
| Pedido_recebido  | Confirmação         | Status obrigatório         | -                 |

| **Comando**  | **Próxima atividade**                     |
|--------------|--------------------------------------------|
| confirmar    | Atividade 9 – Entrar em contato via WhatsApp |


---

### Atividade 9 – Entrar em contato via WhatsApp

| **Campo**             | **Tipo**       | **Restrições**         | **Valor default** |
|-----------------------|----------------|-------------------------|-------------------|
| Resposta_cliente      | Caixa de texto | Mensagem recebida       | -                 |

| **Comando**       | **Próxima atividade**               |
|-------------------|--------------------------------------|
| respondeu         | Atividade 10 – Discutir personalização |
| não_respondeu     | Atividade 11 – Verificar ingredientes |


---

### Atividade 10 – Discutir personalização

| **Campo**             | **Tipo**            | **Restrições**              | **Valor default** |
|-----------------------|---------------------|------------------------------|-------------------|
| Personalizacao_escolhida | Seleção múltipla  | Opções customizáveis         | -                 |

| **Comando** | **Próxima atividade**               |
|-------------|--------------------------------------|
| finalizar   | Atividade 11 – Verificar ingredientes |


---

### Atividade 11 – Verificar ingredientes

| **Campo**             | **Tipo**       | **Restrições**        | **Valor default** |
|-----------------------|----------------|------------------------|-------------------|
| Ingredientes_verificados | Seleção única | Sim / Não              | -                 |

| **Comando**      | **Próxima atividade**                      |
|------------------|---------------------------------------------|
| sim_possui       | Atividade 12 – Gerar ficha técnica          |
| não_possui       | Atividade 13 – Comprar ingredientes         |


---

### Atividade 12 – Gerar ficha técnica

| **Campo**             | **Tipo**       | **Restrições**             | **Valor default** |
|-----------------------|----------------|-----------------------------|-------------------|
| Ficha_gerada          | Confirmação    | Ficha técnica obrigatória   | -                 |

| **Comando** | **Próxima atividade**            |
|-------------|-----------------------------------|
| continuar   | Atividade 13 – Preparar produto   |


---

### Atividade 13 – Preparar produto

| **Campo**              | **Tipo**       | **Restrições**        | **Valor default** |
|------------------------|----------------|------------------------|-------------------|
| Produto_preparado      | Status         | Produção obrigatória  | -                 |

| **Comando**       | **Próxima atividade**               |
|-------------------|--------------------------------------|
| finalizar         | Fim do processo                     |


---

### Atividade 14 – Finalizar produto

| **Campo**           | **Tipo**       | **Restrições**             | **Valor default** |
|---------------------|----------------|-----------------------------|-------------------|
| Produto_finalizado  | Confirmação    | Produto obrigatoriamente concluído | -              |

| **Comando** | **Próxima atividade**          |
|-------------|---------------------------------|
| finalizar   | Atividade 15 – Enviar notificação ao cliente |


---

### Atividade 15 – Enviar notificação ao cliente

| **Campo**               | **Tipo**       | **Restrições**              | **Valor default** |
|-------------------------|----------------|------------------------------|-------------------|
| Notificacao_enviada     | Confirmação    | Mensagem enviada ao cliente | -                 |

| **Comando**    | **Próxima atividade**          |
|----------------|---------------------------------|
| notificar      | Atividade 16 – Entregar produto |


---

### Atividade 16 – Entregar produto

| **Campo**            | **Tipo**       | **Restrições**               | **Valor default** |
|----------------------|----------------|-------------------------------|-------------------|
| Produto_entregue     | Confirmação    | Obrigatório para finalizar    | -                 |

| **Comando** | **Próxima atividade**          |
|-------------|---------------------------------|
| confirmar   | Fim do processo                |

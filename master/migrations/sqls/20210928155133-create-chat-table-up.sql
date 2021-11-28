/* Replace with your SQL commands */


CREATE TABLE IF NOT EXISTS w_chat 
(
    jid VARCHAR(255), 
 	user_id bigint(20),
    name VARCHAR(255),
 	CONSTRAINT pk_w_chat PRIMARY KEY (jid, user_id)
);

-- creating separate user for DB and granting all permissions to database and schema
CREATE USER wave WITH password 'password';
GRANT ALL PRIVILEGES ON DATABASE "alexander" TO wave;

CREATE SCHEMA wave;
GRANT ALL PRIVILEGES ON SCHEMA wave TO wave;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA wave TO wave;
GRANT USAGE ON SCHEMA wave TO wave;

-- creating required tables
create table wave.job(id UUID, timestamp timestamp(6),file_path varchar(30),file_name varchar(30));
CREATE INDEX ON wave.job USING btree (id);

create table wave.employee_data(id bigserial,job_id UUID,date timestamp(6),category varchar(30),employee_name varchar(50),employee_address varchar(100),expense_description varchar(200),pre_tax_amnt numeric(12,2),tax_name varchar(30),tax_amnt numeric(10,2));
CREATE INDEX ON wave.employee_data USING btree (job_id);

ALTER TABLE "wave"."job" OWNER TO "wave";
ALTER TABLE "wave"."employee_data" OWNER TO "wave";

ANALYZE wave.job;
ANALYZE wave.employee_data;

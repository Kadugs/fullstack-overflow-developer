CREATE TABLE public.questions (
	"id" serial NOT NULL,
	"question" varchar(255) NOT NULL,
	"user_id" integer NOT NULL,
	"submit_at" DATE NOT NULL,
	"answered" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.users (
	"id" serial NOT NULL,
	"student" varchar(255) NOT NULL,
	"class_id" integer NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.classes (
	"id" serial NOT NULL,
	"class" varchar(255) NOT NULL,
	CONSTRAINT "classes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.question_tags (
	"id" serial NOT NULL,
	"tag_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	CONSTRAINT "question_tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.tags (
	"id" serial NOT NULL,
	"tag_name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.answers (
	"id" serial NOT NULL,
	"question_id" integer NOT NULL,
	"answered_by" integer NOT NULL,
	"answered_at" DATE NOT NULL,
	"answer" varchar(255) NOT NULL,
	CONSTRAINT "answers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.sessions (
	"id" serial NOT NULL,
	"token" uuid NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("class_id") REFERENCES "classes"("id");


ALTER TABLE "question_tags" ADD CONSTRAINT "question_tags_fk0" FOREIGN KEY ("tag_id") REFERENCES "tags"("id");
ALTER TABLE "question_tags" ADD CONSTRAINT "question_tags_fk1" FOREIGN KEY ("question_id") REFERENCES "questions"("id");


ALTER TABLE "answers" ADD CONSTRAINT "answers_fk0" FOREIGN KEY ("question_id") REFERENCES "questions"("id");
ALTER TABLE "answers" ADD CONSTRAINT "answers_fk1" FOREIGN KEY ("answered_by") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");








--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: valid_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.valid_status AS ENUM (
    'washing',
    'washed',
    'dirty'
);


ALTER TYPE public.valid_status OWNER TO postgres;

--
-- Name: valid_types; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.valid_types AS ENUM (
    'tshirt',
    'shirt',
    'jeans',
    'pj',
    'blanket',
    'sheet',
    'pillowcover'
);


ALTER TYPE public.valid_types OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clothes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clothes (
    cloth_id integer NOT NULL,
    description character varying(255),
    name character varying(20) NOT NULL,
    date_given timestamp without time zone,
    date_came timestamp without time zone,
    image character varying(255),
    type public.valid_types,
    status public.valid_status
);


ALTER TABLE public.clothes OWNER TO postgres;

--
-- Name: clothes_cloth_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clothes_cloth_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clothes_cloth_id_seq OWNER TO postgres;

--
-- Name: clothes_cloth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clothes_cloth_id_seq OWNED BY public.clothes.cloth_id;


--
-- Name: clothes cloth_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clothes ALTER COLUMN cloth_id SET DEFAULT nextval('public.clothes_cloth_id_seq'::regclass);


--
-- Data for Name: clothes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clothes (cloth_id, description, name, date_given, date_came, image, type, status) FROM stdin;
\.


--
-- Name: clothes_cloth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clothes_cloth_id_seq', 1, false);


--
-- Name: clothes clothes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clothes
    ADD CONSTRAINT clothes_pkey PRIMARY KEY (cloth_id);


--
-- PostgreSQL database dump complete
--


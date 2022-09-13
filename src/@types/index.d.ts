
interface ISearchResult {
    consulta: string;
    doc_counts_by_index: IDocCount;
    documentos: IDocumento[],
    filtro_categoria_empresa?: string[];
    filtro_cidade?: string;
    filtro_data_fim?: string;
    filtro_data_inicio?: string;
    filtro_estado?: string;
    filtro_instancias?: string[]
    filtro_tipos_documentos?: string[]
    qid: string;
    pagina_atual: number;
    resultados_por_pagina: number;
    time: number;
    time_elastic: number;
    total_documentos: number;
    total_paginas: number;
}

interface IDocCount {
    [key: string]: number;
}

interface IDocumento {
    categoria_empresa?: string[];
    cidade: string;
    conteudo: string;
    data_criacao: number
    descricao: string;
    entidade_local?: string;
    entidade_municipio?: string;
    entidade_organizacao?: string;
    entidade_pessoa?: string;
    estado: string;
    fonte?: string;
    id: string;
    id_manifestacao?: string;
    id_pai?: string;
    nome_completo_empresa: string;
    nome_curto_empresa?: string;
    ordem_da_interacao?: string;
    posicao_ranking: 1
    resolvido?: string;
    score: number;
    site_empresa?: string;
    tipo: "procon" | "consumidor_gov" | "reclame_aqui";
    tipo_interacao?: string;
    tipo_postagem?: string;
    tipo_problema?: string;
    titulo: string;
}

interface IDocumentDetailResult {
    document: IDocumentDetail
}

interface IDocumentDetail {
    categoria_empresa: string[];
    cidade: string;
    data: string;
    estado: string;
    id: string;
    nome_completo_empresa: string;
    nome_curto_empresa: string;
    resolvido: boolean;
    segmentos?: IDocumentDetailSegment[];
    site_empresa: string;
    tipo_problema: string;
    titulo: string;
}

interface IDocumentDetailSegment {
    conteudo: string;
    ordem_da_interacao: number;
    tipo_interacao: "REPLY" | "ANSWER";
    tipo_postagem: "complaint" | "interaction";
}

interface ICategories {
    id: string,
    categoria: string
}

interface ICity {
    id: string,
    nome_cidade: string
    codigo_cidade: string
    nome_estado: string
    codigo_estado: string
    sigla_estado: string
}
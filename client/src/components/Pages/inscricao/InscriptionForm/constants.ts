import { FormState } from "./types";

export const CONFIRMATION_LABELS = {
    TITLE: "Confirmação dos dados",
    FIELDS: {
        ID: "Bilhete de Identidade",
        FULL_NAME: "Nome completo",
        PHONE: "Número de telefone",
        CATEGORY: "Categoria",
        ROUTE: "Percurso",
        EMERGENCY: "Contacto de emergência",
    },
};

export const MESSAGES = {
    SUCCESS: {
        TITLE: "Inscrição concluída",
        DESCRIPTION:
            "Agradecemos por se inscrever na 16ª Corrida Millennium bim! Sua participação é muito importante para nós e estamos animados para vê-lo(a) no dia 25 de Outubro. Verifique sua caixa de entrada ou spam para o e-mail de confirmação.",
    },
    FAILURE: {
        TITLE: "Inscrição não foi concluída",
        DESCRIPTION:
            "Não é possível continuar a inscrição no site para a categoria seleccionada. As inscrições para as categorias de Juvenis, Federados, Triciclos e Cadeirantes deverão ser realizadas presencialmente na Associação de Atletismo da Cidade de Maputo, localizada no Parque dos Continuadores.",
    },
};

export const initialFormState: FormState = {
    steps: [
        "Dados pessoais",
        "Dados da corrida",
        "Confirmação dos dados",
        "Concluído",
    ],
    currentStep: 0,
    step1: {
        IDCode: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "+258 ",
        country: "Moçambique",
        province: "Maputo",
        dob: "",
        gender: "",
        emergencyName: "",
        emergencyPhone: "",
        emergencyFamiliarity: "",
    },
    step2: {
        category: "",
        shirt: "",
        route: "",
        accept: false,
        acceptterms: false,
    },
    availability: {
        codes: [],
        constraints: {
            corrida15k: 0,
            caminhada7k: 0,
            total: 0,
        },
    },
};

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
            "Agradecemos por se inscrever na 15ª Corrida Millennium bim! Sua participação é muito importante para nós e estamos animados para vê-lo(a) no dia 30 de Novembro. Verifique sua caixa de entrada ou spam para o e-mail de confirmação.",
    },
    FAILURE: {
        TITLE: "Inscrição não foi concluída",
        DESCRIPTION:
            "Não é possível continuar a inscrição para a categoria seleccionada. As inscrições para as categorias de Portadores de Deficiências, Juvenis, Thomas e Federados deverão ser realizadas presencialmente na Associação de Atletismo da Cidade de Maputo, localizada no Parque dos Continuadores, entre os dias 1 e 15 de Novembro.",
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
            populares: 0,
            veteranosI: 0,
            veteranosII: 0,
            estrangeiros: 0,
            total: 0,
        },
    },
};

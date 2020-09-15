import React, { useEffect, FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import CustomTextField from "../FormElements/CustomTextField";
import { update, create, get } from "../../actions/tPaymentMethodActions";
import { getList } from "../../actions/currencyActions";
import CustomSelect from "../FormElements/CustomSelect";

const useStyles = makeStyles(theme => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    wrapper: {
        margin: theme.spacing(1),
        position: "relative"
    },
    buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -9,
        marginLeft: -9
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    select: {
        padding: "10px 0px 10px 0px",
        width: " 100%",
        backgroundColor: "transparent",
        border: 0,
        borderBottom: "1px solid grey",
        fontSize: "16px"
    }
}));

type FormData = {
    description: string;
    status: string;
    info: string;
    currency_id: string;
};

type ComponentProps = {
    id?: number;
};

const TPaymentMethodForm: FunctionComponent<ComponentProps> = ({
    id
}) => {
    const classes = useStyles();
    const { handleSubmit, register, errors, reset, setValue } = useForm<FormData>();
    const {
        tPaymentMethodReducer: { loading },
        currencyReducer: { listData: currencyList },
    } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getList());
        async function fetch() {
            if (id) {
                // Se setea los valores cuando es una edicion
                const response: any = await dispatch(get(id));
                setValue("description", response.description);
                setValue("status", response.status);
                setValue("info", response.info);
                setValue("currency_id", response.currency_id);
            }
        }
        fetch();
    }, [id, dispatch, setValue]);

    useEffect(() => {
        return () => {
            reset();
        };
    }, [reset]);

    // si cumple los requisitos del formulario se ejecuta la creacion o edicio
    const handleForm = (form: object) => {
        if (id) {
            dispatch(update({ id, ...form }));
        } else {
            dispatch(create(form));
        }
    };

    return (
        <Container component="main">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Forma de Pago
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <CustomTextField
                        placeholder="Description"
                        field="description"
                        required
                        register={register}
                        errorsField={errors.description}
                        errorsMessageField={
                            errors.description && errors.description.message
                        }
                    />

                    <CustomTextField
                        placeholder="Infomacion"
                        field="info"
                        required
                        register={register}
                        errorsField={errors.info}
                        errorsMessageField={
                            errors.info && errors.info.message
                        }
                    />

                    <CustomSelect
                        label="Status"
                        selectionMessage="Seleccione"
                        field="status"
                        register={register}
                        errorsMessageField={
                            errors.status && errors.status.message
                        }
                        required
                    >
                        <option value={1}> Activo </option>
                        <option value={0}> Inactivo </option>
                    </CustomSelect>

                    <CustomSelect
                        label="Moneda"
                        selectionMessage="Seleccione"
                        field="currency_id"
                        required
                        register={register}
                        errorsMessageField={
                            errors.currency_id && errors.currency_id.message
                        }
                    >
                        {currencyList.length > 0 && currencyList.map((item: any) => (
                            <option key={item.id} value={item.id}>
                                {item.description}
                            </option>
                        ))}
                    </CustomSelect>

                    <div className={classes.wrapper}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            className={classes.submit}
                        >
                            {id ? "Actualizar" : "Crear"}
                        </Button>
                        {loading && (
                            <CircularProgress size={24} className={classes.buttonProgress} />
                        )}
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default TPaymentMethodForm;

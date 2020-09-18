import React from "react"
import {ErrorMessage} from "formik";
// import {useTranslation} from "react-i18next";

export default ({render, children, component = 'div', name, ...props}) => {

    // const {t, i18n} = useTranslation();

    const renderFn =
        render ||
        children ||
        ((msg) => {
            const msgKey = msg.key || msg
            const values = msg.values || {}

            values.label = values.label || values.path

            return React.createElement(component, props, t(msgKey, values))
        })

    // return <ErrorMessage key={i18n.language + name} name={name} render={renderFn} />
    return <ErrorMessage key={i18n.language + name} name={name} render={renderFn} />
}

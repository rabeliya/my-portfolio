import styles from '../../styles/parts/Form.module.scss'
import { useForm } from 'react-hook-form'
import React, {useCallback } from 'react'
import Contact from '../../src/models/Contact'
import * as yup from 'yup'
import Router from 'next/router'
import classNames from 'classnames/bind'

const useYupValidationResolver = validationSchema =>
  useCallback(
    async data => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        })
        return {
          values,
          errors: {}
        }
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message
              }
            }),
            {}
          )
        }
      }
    },
    [validationSchema]
  )

const validationSchema = yup.object().shape({
  name: yup.string().required('名前は必須項目です'),
  email: yup.string().email('メールアドレスの形式が正しくありません').required('メールアドレスは必須です'),
  body: yup.string().required('内容は必須項目です'),
})

export default function ContactForm() {

    const resolver = useYupValidationResolver(validationSchema)
    const { handleSubmit, register, formState: { errors, isDirty, isValid } } = useForm<Contact> ({
      mode: 'onBlur',
      resolver
    })


  const onSubmit = async (contact:Contact) => {
    if(confirm('この内容で送信しますか？')){
      await fetch('https://k-portfolio.microcms.io/api/v1/contacts',{
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
          'X-WRITE-API-KEY': process.env.X_WRITE_KEY,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(result => {
        console.log(process.env.X_WRITE_KEY);
        
        console.log('Success:',result)
        Router.push('/contact/success')
      })
      .catch(error => {
        console.error('Error', error)
        Router.push('/contact/error')
      })
    }
  }

  // classNames

  const cx = classNames.bind(styles);
  const buttonClass = cx(
    {submitButton: true},
    {btnActive: isValid && isDirty}
  )

  return (
    <form
      method="post"
      name="contactForm"
      className={styles.formWrapper}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="name">
        お名前{errors.name && (<span className={styles.requiredLabel}>{errors.name?.message}</span> )}
      </label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="例）山田太郎"
        {...register("name")}
      />
      <label htmlFor="email">
        メールアドレス{ errors.email && (<span className={styles.requiredLabel}>{errors.email?.message}</span> )}
      </label>
      <input
        id="email"
        name="mail-form"
        type="text"
        placeholder="例）example@example.co.jp"
        {...register("email")}
      />
      <label htmlFor="body">
        お問い合わせ内容{ errors.body && (<span className={styles.requiredLabel}>{errors.body?.message}</span>) }
      </label>
      <textarea 
        name="body"
        id="body"
        cols={30}
        rows={10}
        placeholder="お問い合わせ内容をご記入ください。サイト改修のご依頼の場合はページ数や納期についてもご記入ください。"
        {...register("body")}
      />
      <input
        type="hidden"
        name="honeypot"
      />
      <input
        type="submit"
        className={buttonClass}
      />
    </form>
  )
}
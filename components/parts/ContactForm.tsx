import styles from '../../styles/parts/Form.module.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import React, {useCallback } from 'react'
import Router, { useRouter } from 'next/router'
import Contact from '../../src/models/Contact'
import * as yup from 'yup'

// react-form-hook導入まで。

 // リファレンス通り
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

// useStateの値がエラー表示に関わっているため、ここをふかぼる
    const resolver = useYupValidationResolver(validationSchema)
    const { handleSubmit, register, formState: { errors } } = useForm<Contact> ({
      // blurイベントは要素がマウスなどのポインティング・デバイスやタブキーなどでフォーカスを失ったタイミングで発生する
      mode: 'onBlur',
      resolver
    })

  // const onSubmit = data => console.log(data)
  const router = useRouter()

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? ''
  const onSubmit = async (contact:Contact): Promise<void> => {
    try {
      // ここのURLはホスティング後に設定する
      await fetch(baseUrl + '/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charaset=utjf-8',
          'X-WRITE_KEY': process.env.X_WRITE_KEY
        },
        body: JSON.stringify(contact),
      }).then(res => {
        if(!res.ok) {
          throw Error(`${res.status} ${res.statusText}`)
        }
      })
      void router.push('/contact/success')
    } catch(err) {
      void router.push('/contact/error')
    }
  }
 
  // -- と --の項目に不備があります　のメッセージを出したい

  return (
    <form
      action=""
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
        name="body-contents"
        id="body"
        cols={30}
        rows={10}
        placeholder="お問い合わせ内容をご記入ください。サイト改修のご依頼の場合はページ数や納期についてもご記入ください。"
        {...register("body")}
      />
      <input type="submit"/>
    </form>
  )
}
'use client';

import { useState, ChangeEvent, MouseEvent } from 'react';
import { FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';
import RedButton from '@/components/buttons/redButton';
import Swal from 'sweetalert2';
import { validEmail } from '@/utils/utils';
import Separator from '@/components/texts/separator';
import SocialNetworks from '@/components/socialNetworks';
import Title from '@/components/texts/title';
import SubTitle from '@/components/texts/subTitle';
import Text from '@/components/texts/text';
import { contactInfo } from '@/types/constants';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const onChangeFormData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      Swal.fire({
        title: 'Info!',
        text: 'Completar todos los campos.',
        icon: 'info',
        confirmButtonText: 'Ok',
      });
    } else if (!validEmail(formData.email)) {
      Swal.fire({
        title: 'Info!',
        text: 'Por favor poner un email valido.',
        icon: 'info',
        confirmButtonText: 'Ok',
      });
    } else {
      try {
        setLoading(true);

        const res = await fetch('/api/nodemailer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
          Swal.fire({
            title: 'Éxito!',
            text: data.message || 'Email enviado correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });

          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
          });
        } else {
          throw new Error(data.message || 'Error al enviar el email.');
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al enviar el email. Por favor intentá de nuevo.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="flex items-center justify-center bg-secondary-white py-16 px-4">
      <div className="flex flex-col md:flex-row justify-center gap-12">
        <div className="flex flex-col gap-7 w-full md:w-[50%]">
          <Separator value="Contactanos" />

          <Title value="Mantente conectado" color="secondary" />
          <Text
            value="Completá el formulario o escribinos directamente. Nos pondremos en
            contacto lo antes posible."
            color="secondary"
          />

          <div className="flex items-center gap-2 sm:gap-5">
            <div className="flex items-center justify-center p-4 text-white text-2xl rounded-full bg-secondary-darkBlue">
              <FaPhoneAlt />
            </div>

            <div className="flex flex-col gap-1">
              <SubTitle value="Telefono" color="secondary" />
              <Text value={contactInfo.phone} color="secondary" />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-5">
            <div className="flex items-center justify-center p-4 text-white text-2xl rounded-full bg-secondary-darkBlue">
              <FaPaperPlane />
            </div>

            <div className="flex flex-col gap-1">
              <SubTitle value="Email" color="secondary" />
              <Text value={contactInfo.email} color="secondary" />
            </div>
          </div>

          <SocialNetworks />
        </div>

        <form className="flex flex-col gap-7 w-full md:w-[50%]">
          <Title value="Dejanos tu mensaje" color="secondary" />

          <div className="flex flex-col gap-4">
            <input
              placeholder="Nombre"
              className="w-full text-black rounded-md border border-gray-300 px-6 py-4 placeholder:text-base placeholder:text-gray-500 focus:outline-none focus:border-darkGray"
              value={formData.name}
              name="name"
              onChange={onChangeFormData}
            />
            <input
              placeholder="Email"
              className="w-full text-black rounded-md border border-gray-300 px-6 py-4 placeholder:text-base placeholder:text-gray-500 focus:outline-none focus:border-darkGray"
              value={formData.email}
              name="email"
              onChange={onChangeFormData}
            />
            <input
              placeholder="Telefono"
              className="w-full text-black rounded-md border border-gray-300 px-6 py-4 placeholder:text-base placeholder:text-gray-500 focus:outline-none focus:border-darkGray"
              type="number"
              value={formData.phone}
              name="phone"
              onChange={onChangeFormData}
            />
            <textarea
              placeholder="Mensaje..."
              className="h-38 w-full text-black rounded-md border border-gray-300 px-6 py-4 placeholder:text-base placeholder:text-gray-500 focus:outline-none focus:border-darkGray"
              value={formData.message}
              name="message"
              onChange={onChangeFormData}
            />
          </div>

          <RedButton
            value="Enviar"
            onClick={(e) => onSubmit(e)}
            loading={loading}
          />
        </form>
      </div>
    </section>
  );
}

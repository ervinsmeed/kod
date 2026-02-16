import { useTranslation } from "react-i18next";
import { BookingForm } from "../components/BookingForm";

export const Booking = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-2xl text-center sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {t("booking.title")}
      </h1>

      <div className="container mx-auto px-4 py-8 flex justify-center ">
        <div className="max-w-2xl">
          <BookingForm />
        </div>
      </div>
    </>
  );
};

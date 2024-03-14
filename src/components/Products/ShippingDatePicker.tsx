import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { es } from 'date-fns/locale'
import {
  setHours,
  setMinutes,
  addHours,
  startOfHour,
  addMinutes,
  startOfDay,
  differenceInHours,
  addDays,
} from 'date-fns'

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  weight: ['800', '400'],
  subsets: ['latin'],
})

const midnight = setMinutes(setHours(startOfDay(new Date()), 0), 0) // Medianoche de la fecha actual

interface ShippingDatePickerProps {
  selectedDate: Date | undefined
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

const ShippingDatePicker = ({
  selectedDate,
  setSelectedDate,
}: ShippingDatePickerProps) => {
  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const isHourDisabled = (date: Date) => {
    const hour = date.getHours()
    return hour < 9 || hour > 17
  }

  const hoursToShow = []

  for (let i = 0; i < 24; i++) {
    const currentDate = setMinutes(setHours(new Date(), i), 0)
    if (!isHourDisabled(currentDate)) {
      hoursToShow.push(currentDate)
    }
  }

  const calculateProductionRange = (productionHours = 10) => {
    const currentDateTime = startOfHour(new Date())
    const startHour = setHours(setMinutes(currentDateTime, 0), 9)
    const endHour = setHours(setMinutes(currentDateTime, 0), 19)

    const excludedTimes = []
    let hour = startHour

    for (let i = 0; i < productionHours; i++) {
      if (hour >= endHour && hour <= midnight) {
        console.log('entro antes', hour)
        hour = addDays(hour, 1)
        hour = addHours(hour, differenceInHours(hour, startHour))
      }

      if (hour >= midnight && hour <= startHour) {
        console.log('entro despues' + hour)
        hour = addHours(hour, differenceInHours(hour, startHour))
      }

      excludedTimes.push(hour)
      excludedTimes.push(addMinutes(hour, 30))
      hour = addHours(hour, 1)
    }

    return excludedTimes
  }

  return (
    <>
      <div className='flex items-center flex-col justify-center w-full'>
        <p className={`${montserrat.className} text-slate-500 text-sm mb-3`}>
          Elija el tiempo de envio
        </p>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          excludeDates={calculateProductionRange(0)}
          minDate={new Date()}
          minTime={hoursToShow[0]}
          maxTime={hoursToShow[hoursToShow.length - 1]}
          placeholderText='Hora y fecha del envio'
          timeIntervals={30}
          dateFormat='d MMMM yyyy, h:mm aa'
          locale={es}
          timeCaption='Hora'
          className='border rounded-lg p-2 text-sm border-slate-300 text-slate-500'
        />
      </div>
    </>
  )
}

export default ShippingDatePicker

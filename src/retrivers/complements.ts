import client from '@/apollo-client'
import ComplementProduct from '@/interfaces/domain/ComplementProduct'

import { getComplementByIdQuery } from '@/queries/complementQueries'

import { mapComplement } from '@/utils/mappers/complements/complementMapper'

export const getComplementById = async (
  complementId: string
): Promise<ComplementProduct> => {
  const { data } = await client.query({
    query: getComplementByIdQuery(complementId),
  })

  const complement = mapComplement(data.complemento.data)

  return complement
}

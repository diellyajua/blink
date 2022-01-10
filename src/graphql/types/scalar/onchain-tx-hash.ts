import { isSha256Hash } from "@domain/bitcoin"
import { GT } from "@graphql/index"
import { UserInputError } from "apollo-server-errors"

const OnChainTxHash = new GT.Scalar({
  name: "OnChainTxHash",
  parseValue(value) {
    return validOnChainTxHash(value)
  },
  parseLiteral(ast) {
    if (ast.kind === GT.Kind.STRING) {
      return validOnChainTxHash(ast.value)
    }
    return new UserInputError("Invalid type for OnChainTxHash")
  },
})

function validOnChainTxHash(value) {
  return isSha256Hash(value)
    ? value
    : new UserInputError("Invalid value for OnChainTxHash")
}

export default OnChainTxHash

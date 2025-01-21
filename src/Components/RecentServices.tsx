interface RecentServicesProps {
  image?: string
  serviceType?: string
  productName: string
  quantity: number
  price: number
}

const RecentServices = ({
  image = "/api/placeholder/48/48",
  serviceType = "Service",
  productName,
  quantity,
  price,
}: RecentServicesProps) => {
  return (
    <div>
      <div className="flex rounded-lg bg-white items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-md overflow-hidden">
            <img src={image || "/placeholder.svg"} alt={productName} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">{serviceType}</span>
            <span className="font-medium">{productName}</span>
          </div>
        </div>

        <div className="flex items-center space-x-16">
          <div className="text-center">
            <div className="text-sm text-gray-500">Qt</div>
            <span>{quantity}</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Total</div>
            <span>Rs {price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentServices


export default function WeAreHiring() {
  return (
    <div className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">WE ARE HIRING</h2>
            <p className="text-gray-300 text-lg mb-6">Join our team and help us build the future of work</p>
            <button className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 font-medium">
              View Open Positions
            </button>
          </div>
          <div className="hidden lg:block">
            <img src="/images/office-environment.png" alt="Office workspace" className="rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

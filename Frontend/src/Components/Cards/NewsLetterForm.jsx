function NewsletterForm() {
    return (
      <form className="space-y-3">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
        />
        <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded">
          Subscribe now
        </button>
      </form>
    )
  }
  
  export default NewsletterForm
  
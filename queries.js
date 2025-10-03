//This is to find all books in a specific genre
db.books.find({ genre: "Fiction" })

//This query finds books publsihed after a specific year
db.books.find({ published_year: { $gt: 2000 } })

//This query is to find books publsihed by a selected author
db.books.find({ author: "Paulo Coelho" })

//This is to pdate a price of a specific or selected book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 180 } }
)

//This deletes a book by a selected or specific title
db.books.deleteOne({ title: "Educated" })

//Task4-how to calculate the average rice of books by the genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
])

//This query will help us find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])

//books by publiction date and counted
db.books.aggregate([
  {
    $project: {
      decade: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] }
    }
  },
  {
    $group: {
      _id: "$decade",
      totalBooks: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])

//creating an index on the title field
db.books.createIndex({ title: 1 })

//then to compound the index or create one
db.books.createIndex({ author: 1, published_year: -1 })

//Using the explain method by title
db.books.find({ title: "1984" }).explain("executionStats")
//Using explain method by author and publishing year
db.books.find({ author: "Paulo Coelho", published_year: 1988 }).explain("executionStats")



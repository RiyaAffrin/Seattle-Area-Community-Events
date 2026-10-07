// imports db connection
import { pool } from './database.js'

// paste your tested image URLs here
const images = [
  { name: "Seattle", image: "https://dynamic-media.tacdn.com/media/photo-o/30/35/62/a2/caption.jpg?f=webp&w=1000&h=700" },
  { name: "Tacoma", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiV7cmX4PEWvOwvR3lzXCvG1yIkjSsWTLi0LrjSnz3wnAL2R3YSJ3yP4l1DpTqvv9QmLHlj-GIl3NeO09R8Fc39FCv3GpLIWc4yTjkgpJNiy_NAkR85XbpmZfpNAKjPLYQbhsLdDh_MPDgT/s1600/!tacoma+dome1++job+812050.bmp" },
  { name: "Bellevue", image: "https://www.exoticmotors.net/wp-content/uploads/2022/05/zac-gudakov-C6qSr-Fnvdg-unsplash-scaled.jpg" },
  { name: "Olympia", image: "https://media.istockphoto.com/id/490632674/photo/washington-state-capitol-building.jpg?s=612x612&w=0&k=20&c=8M2Vj-0oJQYVolLrrTDAzeQtKCiTJmomQrNdb-JtK30=" },
]

async function updateImages() {
  try {
    for (const loc of images) {
      await pool.query(
        'UPDATE locations SET image = $1 WHERE name = $2',
        [loc.image, loc.name]
      )
    }
    console.log("✅ Updated location images")
  } catch (err) {
    console.error("❌ Error updating images:", err.message)
  } finally {
    pool.end()
  }
}

updateImages()
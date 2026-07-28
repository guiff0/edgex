import { Model } from "@nozbe/watermelondb"
import { text } from "@nozbe/watermelondb/decorators"

export class ApplicationModel extends Model {
  static table = "applications"

   jobId!: string
  fullName!: string
  email!: string
 phone!: string
 coverNote!: string
 resumeUri!: string
   resumePath!: string
  uploadStatus!: string
   createdAt!: string
}

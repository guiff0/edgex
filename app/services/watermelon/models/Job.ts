import { Model } from "@nozbe/watermelondb"
import { field, text } from "@nozbe/watermelondb/decorators"

export class JobModel extends Model {
  static table = "jobs"

  remoteId!: string
  title!: string
 department!: string
  location!: string
  employmentType!: string
summary!: string
   description!: string
  requirementsJson!: string
   postedAt!: string
   active!: boolean
}

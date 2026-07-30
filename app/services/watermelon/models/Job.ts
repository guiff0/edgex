import { Model } from "@nozbe/watermelondb"
import { field, text } from "@nozbe/watermelondb/decorators"

export class JobModel extends Model {
  static table = "jobs"

  @text("remote_id") remoteId: string
  @text("title") title: string
  @text("department") department: string
  @text("location") location: string
  @text("location_category") locationCategory: string
  @text("employment_type") employmentType: string
  @text("role") role: string
  @text("field") jobField: string
  @text("summary") summary: string
  @text("description") description: string
  @text("requirements") requirementsJson: string
  @text("posted_at") postedAt: string
  @field("active") active: boolean
  @text("job_identification") jobIdentification: string
  @text("full_address") fullAddress: string
  @text("base_pay_salary") basePaySalary: string
  @text("responsibilities") responsibilitiesJson: string
  @text("preferred_qualifications") preferredQualificationsJson: string
}

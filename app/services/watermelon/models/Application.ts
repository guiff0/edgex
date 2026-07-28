import { Model } from "@nozbe/watermelondb"
import { text } from "@nozbe/watermelondb/decorators"

export class ApplicationModel extends Model {
  static table = "applications"

  @text("job_id") jobId: string
  @text("full_name") fullName: string
  @text("email") email: string
  @text("phone") phone: string
  @text("cover_note") coverNote: string
  @text("resume_uri") resumeUri: string
  @text("resume_path") resumePath: string
  @text("upload_status") uploadStatus: string
  @text("sync_status") syncStatus: string
  @text("submitted_at") submittedAt: string
}

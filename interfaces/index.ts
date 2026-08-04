export interface IUser {
  id: string;
  email: string;
  name: string;
  profile_picture_url: string;
  resume_url: string;
  created_at: string;
  password: string;
  role: "job_seeker" | "recruiter";
}

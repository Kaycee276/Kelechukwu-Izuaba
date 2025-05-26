import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import type { SocialLink } from "../components/Socials";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const socials: SocialLink[] = [
	{
		name: "Whatsapp",
		url: "https://wa.me/2349127178874",
		icon: <FaWhatsapp className="text-lg sm:text-xl md:text-2xl" />,
	},
	{
		name: "Email",
		url: "mailto:kizuaba@gmail.com",
		icon: <MdEmail className="text-lg sm:text-xl md:text-2xl" />,
	},
];

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const { error: insertError } = await supabase
				.from("messages") // Use lowercase consistently
				.insert([
					{
						name: formData.name,
						message: formData.message,
						// sent_at will auto-populate from DEFAULT
					},
				]);

			if (insertError) throw insertError;

			setSuccess(true);
			setFormData({ name: "", message: "" });
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(
					err.message.includes("401")
						? "Authentication failed - check your Supabase keys"
						: err.message
				);
			} else {
				setError("An unknown error occurred.");
			}
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="h-full flex items-center justify-center">
			<div className="text-center max-w-2xl px-4 flex flex-col gap-5">
				<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
					Contacts
				</h1>
				<p className="text-lg text-gray-200 mb-8">
					Get in touch for collaborations and inquiries.
				</p>

				{/* Contact Form */}
				<form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-5">
					<input
						type="text"
						name="name"
						placeholder="Your Name"
						value={formData.name}
						onChange={handleChange}
						required
						minLength={2}
						className="w-full px-4 py-3 border-b text-white placeholder-gray-400 focus:outline-none focus:border-[#e85d04] transition-all duration-200"
					/>
					<textarea
						name="message"
						placeholder="Your Message"
						value={formData.message}
						onChange={handleChange}
						rows={4}
						required
						className="w-full px-4 py-3 border-b text-white placeholder-gray-400 focus:outline-none focus:border-[#e85d04] transition-all duration-200 resize-none"
					/>

					{error && (
						<p className="text-red-400 text-sm">
							{error.includes("violates row-level security")
								? "Server error: Please try again later"
								: error}
						</p>
					)}
					{success && (
						<p className="text-green-400 text-sm">Message sent successfully!</p>
					)}

					<motion.button
						type="submit"
						disabled={loading}
						variants={fadeIn("up", "spring", 0.2, 1)}
						whileTap={{ scale: 0.95 }}
						className="mt-6 px-4 py-2 bg-white/5 border border-white/20 rounded-sm text-white text-sm cursor-pointer hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Sending..." : "Send Message"}
					</motion.button>
				</form>

				{/* Social Icons */}
				<div className="flex justify-center gap-8">
					{socials.map((social) => (
						<a
							href={social.url}
							key={social.name}
							target="_blank"
							rel="noopener noreferrer"
							className="text-white hover:text-blue-400 transition-colors duration-200"
						>
							{social.icon}
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default Contact;

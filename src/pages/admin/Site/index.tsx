import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface SiteSettings {
    banner: string;
    footer: string;
}

const SiteSettingsPage: React.FC = () => {
    const [settings, setSettings] = useState<SiteSettings>({
        banner: "",
        footer: "",
    });

    const [isSaving, setIsSaving] = useState(false);

    const bannerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    const bannerQuill = useRef<Quill | null>(null);
    const footerQuill = useRef<Quill | null>(null);

    useEffect(() => {
        if (bannerRef.current && !bannerQuill.current) {
            bannerQuill.current = new Quill(bannerRef.current, {
                theme: "snow",
                placeholder: "Enter banner content...",
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline"],
                        [{ color: [] }], // ✅ color + highlight
                        [{ header: [1, 2, 3, false] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link"],
                        ["clean"]
                    ],
                },
            });
            bannerQuill.current.on("text-change", () => {
                setSettings((prev) => ({
                    ...prev,
                    banner: bannerQuill.current!.root.innerHTML,
                }));
                localStorage.setItem("siteBanner", bannerQuill.current!.root.innerHTML);
            });
        }

        if (footerRef.current && !footerQuill.current) {
            footerQuill.current = new Quill(footerRef.current, {
                theme: "snow",
                placeholder: "Enter footer content...",
            });

            footerQuill.current.on("text-change", () => {
                setSettings((prev) => ({
                    ...prev,
                    footer: footerQuill.current!.root.innerHTML,
                }));
            });
        }
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await fetch("/api/site-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (response.ok) {
                alert("Settings saved successfully");
            }
        } catch (error) {
            console.error("Error saving settings:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Site Settings</h1>

            <div className="mb-8">
                <label className="block text-lg font-semibold mb-3">Banner</label>
                <div ref={bannerRef} />
            </div>
            <div className="border p-4 mt-4">
                <h2>Preview:</h2>
                <div dangerouslySetInnerHTML={{ __html: settings.banner }} />
            </div>
            <div className="mb-8">
                <label className="block text-lg font-semibold mb-3">Footer</label>
                <div ref={footerRef} />
            </div>

            <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {isSaving ? "Saving..." : "Save Settings"}
            </button>
        </div>
    );
};

export default SiteSettingsPage;
import React, { useEffect, useRef, useState, useMemo } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Typography, Card, Button, Space, message } from "antd";
import CommonPageHeader from "@/components/common/CommonPageHeader";
import { SaveOutlined, SettingOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSiteSettings, saveSiteSettings } from "@/api/siteSettings";

interface SiteSettings {
    advertise1: string;
    advertise2: string;
    notice: string;
}

const SiteSettingsPage: React.FC = () => {
    const queryClient = useQueryClient();
    const [settings, setSettings] = useState<SiteSettings>({
        advertise1: "",
        advertise2: "",
        notice: "",
    });
    const { Title, Text } = Typography;

    const advertise1Ref = useRef<HTMLDivElement>(null);
    const advertise2Ref = useRef<HTMLDivElement>(null);
    const noticeRef = useRef<HTMLDivElement>(null);

    const advertise1Quill = useRef<Quill | null>(null);
    const advertise2Quill = useRef<Quill | null>(null);
    const noticeQuill = useRef<Quill | null>(null);

    // Fetch existing settings
    const { data: settingsResponse, isLoading: isLoadingSettings } = useQuery({
        queryKey: ["site-settings"],
        queryFn: getSiteSettings,
    });

    // Process settings data
    const existingSettings = useMemo(() => {
        if (!settingsResponse) return null;
        const rawData = (settingsResponse as any).data || settingsResponse;
        return Array.isArray(rawData) ? rawData[0] : rawData;
    }, [settingsResponse]);

    // Save mutation
    const saveMutation = useMutation({
        mutationFn: (data: SiteSettings) => saveSiteSettings(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["site-settings"] });
            message.success("Settings saved successfully");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Failed to save settings");
        },
    });

    // Initialize Quill editors and load existing data
    useEffect(() => {
        if (advertise1Ref.current && !advertise1Quill.current) {
            advertise1Quill.current = new Quill(advertise1Ref.current, {
                theme: "snow",
                placeholder: "Enter advertise 1 content...",
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline"],
                        [{ color: [] }],
                        [{ header: [1, 2, 3, false] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link"],
                        ["clean"],
                    ],
                },
            });
            advertise1Quill.current.on("text-change", () => {
                setSettings((prev) => ({
                    ...prev,
                    advertise1: advertise1Quill.current!.root.innerHTML,
                }));
            });
        }

        if (advertise2Ref.current && !advertise2Quill.current) {
            advertise2Quill.current = new Quill(advertise2Ref.current, {
                theme: "snow",
                placeholder: "Enter advertise 2 content...",
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline"],
                        [{ color: [] }],
                        [{ header: [1, 2, 3, false] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link"],
                        ["clean"],
                    ],
                },
            });
            advertise2Quill.current.on("text-change", () => {
                setSettings((prev) => ({
                    ...prev,
                    advertise2: advertise2Quill.current!.root.innerHTML,
                }));
            });
        }

        if (noticeRef.current && !noticeQuill.current) {
            noticeQuill.current = new Quill(noticeRef.current, {
                theme: "snow",
                placeholder: "Enter notice content...",
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline"],
                        [{ color: [] }],
                        [{ header: [1, 2, 3, false] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link"],
                        ["clean"],
                    ],
                },
            });
            noticeQuill.current.on("text-change", () => {
                setSettings((prev) => ({
                    ...prev,
                    notice: noticeQuill.current!.root.innerHTML,
                }));
            });
        }
    }, []);

    // Load existing data into editors
    useEffect(() => {
        if (
            existingSettings &&
            advertise1Quill.current &&
            advertise2Quill.current &&
            noticeQuill.current
        ) {
            advertise1Quill.current.root.innerHTML = existingSettings.advertise1 || "";
            advertise2Quill.current.root.innerHTML = existingSettings.advertise2 || "";
            noticeQuill.current.root.innerHTML = existingSettings.notice || "";

            setSettings({
                advertise1: existingSettings.advertise1 || "",
                advertise2: existingSettings.advertise2 || "",
                notice: existingSettings.notice || "",
            });
        }
    }, [existingSettings]);

    const handleSave = () => {
        saveMutation.mutate(settings);
    };

    return (
        <div>
            <CommonPageHeader
                title="Site Settings"
                icon={<SettingOutlined />}
                buttonLabel="Save Settings"
                buttonIcon={<SaveOutlined />}
                onButtonClick={handleSave}
            />
            <label style={{ color: "red" }}>
                * Always Save Site Settings After changes *
            </label>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <div>
                    <Text
                        strong
                        style={{
                            fontSize: 28,
                            display: "block",
                            marginBottom: 12,
                        }}
                    >
                        Advertise 1
                    </Text>

                    <div ref={advertise1Ref} />
                </div>

                <Card title="Advertise 1 Preview">
                    <div className="notice-box common-border">
                    <div className="notice-body" dangerouslySetInnerHTML={{ __html: settings.advertise1 }} style={{ backgroundColor: "#ffcc99" }} />
                    </div>
                </Card>

                <div>
                    <Text
                        strong
                        style={{
                            fontSize: 28,
                            display: "block",
                            marginBottom: 12,
                        }}
                    >
                        Advertise 2
                    </Text>

                    <div ref={advertise2Ref} />
                </div>
                <Card title="Advertise 2 Preview">
                    <div dangerouslySetInnerHTML={{ __html: settings.advertise2 }} className="whatsapp-box common-border" />
                </Card>
                <div>
                    <Text
                        strong
                        style={{
                            fontSize: 28,
                            display: "block",
                            marginBottom: 12,
                        }}
                    >
                        Notice
                    </Text>

                    <div ref={noticeRef} />
                </div>
                <Card title="Notice Preview">
                    <div className="notice-box common-border">
                        <div className="notice-header">★ NOTICE ★</div>
                        <div dangerouslySetInnerHTML={{ __html: settings.notice }} className="notice-body" style={{ backgroundColor: "#ffcc99" }} />
                    </div>
                </Card>
            </Space>
        </div>
    );
};

export default SiteSettingsPage;
export default function TriangleLoader() {
    return (
        <div className="flex items-center justify-center bg-white/60 z-50 py-75">
            <svg
                viewBox="0 0 100 100"
                className="w-20 h-20 animate-[spin_1s_linear_infinite] text-blue-400"
            >
                <polygon points="50,5 95,85 5,85" fill="currentColor" />
            </svg>
        </div>
    )
}

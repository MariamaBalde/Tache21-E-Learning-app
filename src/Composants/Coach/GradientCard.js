// best
const GradientCard = ({ title, icon: Icon, gradient, count }) => {
    return (
        <div className={`p-6 rounded-2xl shadow-lg ${gradient} text-white`}>
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{title}</h3>
                <Icon size={32} />
            </div>
            <p className="text-2xl font-bold mt-4">{count}</p>
        </div>
    );
};
export default GradientCard;
// best



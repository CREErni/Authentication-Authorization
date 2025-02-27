import logo from '../assets/logoooo.png';
function Play() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#61ADAB]">
            <div className="p-8 rounded-lg w-96">
                <img src={logo} alt="Mathalino logo" className="mx-auto mb-6" />
                <h1 className="text-4xl text-[#0F382A] text-center mb-6">Welcome to Mathalino!</h1>
                <button className="w-full bg-[#0F382A] font-bold text-3xl text-[#F8E21E] p-2 rounded hover:bg-green-600 transition duration-200">
                    Play
                </button>
            </div>
            
        </div>
    );
}

export default Play;
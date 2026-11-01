import './Header.css'

type HeaderProps = {
    onAddTask: () => void;
};

const Header = ({ onAddTask }: HeaderProps) => (
    <header className="header flex justify-between items-center p-4">
       <a href="/" className="text-2xl font-bold text-blue-800">
           ZalogHubTest
       </a>

        <button
            type="button"
            aria-label="Add task"
            onClick={onAddTask}
            className="w-20 h-10 bg-blue-500 hover:bg-blue-700
            text-white font-bold py-2 px-4 rounded-2xl"
        >
            +
        </button>
    </header>
)

export default Header;

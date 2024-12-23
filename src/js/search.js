const apiUrls = {
    mapSearch: 'api/search/getMapSearch.php',
    completions: 'api/search/getCompletions.php',
    guide: 'api/search/getGuides.php',
    personalRecords: 'api/search/getPersonalRecords.php'
};

const sectionLoadingOperations = {
    mapSearch: async () => {
        const response = await fetch('api/search/getMapSearch.php');
        const data = await response.json();
        //console.log(data);
    },
    completions: async () => {
        const response = await fetch('api/search/getCompletions.php');
        const data = await response.json();
        //console.log(data);
    },
    guide: async () => {
        const response = await fetch('api/search/getGuides.php');
        const data = await response.json();
        //console.log(data);
    },
    personalRecords: async () => {
        const response = await fetch(`api/search/getPersonalRecords.php?user_id=${encodeURIComponent(user_id)}`);
        const data = await response.json();
        //console.log(data);
    }
};

const filterOptions = {};
const selectedFilters = [];
let mechanicsOptions = [];
let restrictionsOptions = [];
let translations = {};
let currentSection = "";
let currentPage = 1;
let cachedPages = {};
let filters = {};
let activeFilters = {};
let persistentFilters = {};
let icons = [];
let debounceTimeout;
const pageSize = 25;
let totalPages = 1;
let hideTimeout;
const applyFiltersButton = document.getElementById("applyFiltersBtn");
const resultsContainer = document.getElementById("resultsContainer");

const difficultyColors = {
    "Beginner": "#00ff1a",
    "Easy": "#cdff3a",
    "Medium": "#fbdf00",
    "Hard": "#ff9700",
    "Very Hard": "#ff4500",
    "Extreme": "#ff0000",
    "Hell": "#9a0000",
};

const difficultyOptions = ["Beginner", "Easy", "Medium", "Hard", "Very Hard", "Extreme", "Hell"];

// Toolbar
const toolbar = document.querySelector(".toolbar");
const iconName = document.getElementById("icon-name");
const circle = document.querySelector(".selection-circle");


function initializeIcons() {
    icons = [
        "map_code", "user", "creator", "map_name", "difficulty", 
        "map_type", "mechanics", "restrictions", "only_playtest", 
        "ignore_completions", "only_maps_with_medals", "apply_filters", "clear_filters"
    ].map(id => ({
        id,
        name: t(`filters_toolbar.${id}`) || id.replace('_', ' ').toUpperCase(),
        svg: getIconSVG(id)
    }));
}

function getIconSVG(id) {
    const svgs = {
        "map_code": `<path d="M15 9H15.01M15 15C18.3137 15 21 12.3137 21 9C21 5.68629 18.3137 3 15 3C11.6863 3 9 5.68629 9 9C9 9.27368 9.01832 9.54308 9.05381 9.80704C9.11218 10.2412 9.14136 10.4583 9.12172 10.5956C9.10125 10.7387 9.0752 10.8157 9.00469 10.9419C8.937 11.063 8.81771 11.1823 8.57913 11.4209L3.46863 16.5314C3.29568 16.7043 3.2092 16.7908 3.14736 16.8917C3.09253 16.9812 3.05213 17.0787 3.02763 17.1808C3 17.2959 3 17.4182 3 17.6627V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H6.33726C6.58185 21 6.70414 21 6.81923 20.9724C6.92127 20.9479 7.01881 20.9075 7.10828 20.8526C7.2092 20.7908 7.29568 20.7043 7.46863 20.5314L12.5791 15.4209C12.8177 15.1823 12.937 15.063 13.0581 14.9953C13.1843 14.9248 13.2613 14.8987 13.4044 14.8783C13.5417 14.8586 13.7588 14.8878 14.193 14.9462C14.4569 14.9817 14.7263 15 15 15Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "nickname": `<path d="M16.5 14C16.2164 12.8589 14.981 12 13.5 12C12.019 12 10.7836 12.8589 10.5 14M13.5 8H13.51M18 21H10.2C7.67976 21 6.41965 21 5.45704 20.5095C4.61031 20.0781 3.9219 19.3897 3.49047 18.543C3 17.5804 3 16.3202 3 13.8V6M9.2 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H9.2C8.0799 3 7.51984 3 7.09202 3.21799C6.71569 3.40973 6.40973 3.71569 6.21799 4.09202C6 4.51984 6 5.07989 6 6.2V14.8C6 15.9201 6 16.4802 6.21799 16.908C6.40973 17.2843 6.71569 17.5903 7.09202 17.782C7.51984 18 8.0799 18 9.2 18ZM14.5 8C14.5 8.55228 14.0523 9 13.5 9C12.9477 9 12.5 8.55228 12.5 8C12.5 7.44772 12.9477 7 13.5 7C14.0523 7 14.5 7.44772 14.5 8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "creator": `<path d="M16.5 14C16.2164 12.8589 14.981 12 13.5 12C12.019 12 10.7836 12.8589 10.5 14M13.5 8H13.51M18 21H10.2C7.67976 21 6.41965 21 5.45704 20.5095C4.61031 20.0781 3.9219 19.3897 3.49047 18.543C3 17.5804 3 16.3202 3 13.8V6M9.2 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H9.2C8.0799 3 7.51984 3 7.09202 3.21799C6.71569 3.40973 6.40973 3.71569 6.21799 4.09202C6 4.51984 6 5.07989 6 6.2V14.8C6 15.9201 6 16.4802 6.21799 16.908C6.40973 17.2843 6.71569 17.5903 7.09202 17.782C7.51984 18 8.0799 18 9.2 18ZM14.5 8C14.5 8.55228 14.0523 9 13.5 9C12.9477 9 12.5 8.55228 12.5 8C12.5 7.44772 12.9477 7 13.5 7C14.0523 7 14.5 7.44772 14.5 8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "user": `<path d="M16.5 14C16.2164 12.8589 14.981 12 13.5 12C12.019 12 10.7836 12.8589 10.5 14M13.5 8H13.51M18 21H10.2C7.67976 21 6.41965 21 5.45704 20.5095C4.61031 20.0781 3.9219 19.3897 3.49047 18.543C3 17.5804 3 16.3202 3 13.8V6M9.2 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H9.2C8.0799 3 7.51984 3 7.09202 3.21799C6.71569 3.40973 6.40973 3.71569 6.21799 4.09202C6 4.51984 6 5.07989 6 6.2V14.8C6 15.9201 6 16.4802 6.21799 16.908C6.40973 17.2843 6.71569 17.5903 7.09202 17.782C7.51984 18 8.0799 18 9.2 18ZM14.5 8C14.5 8.55228 14.0523 9 13.5 9C12.9477 9 12.5 8.55228 12.5 8C12.5 7.44772 12.9477 7 13.5 7C14.0523 7 14.5 7.44772 14.5 8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "map_name": `<path d="M14.4996 8.5001H14.5096M16.2196 19.9601L10.5508 14.2705C9.7579 13.4747 9.36143 13.0768 8.90391 12.9277C8.50148 12.7966 8.06782 12.7965 7.66534 12.9275C7.20776 13.0764 6.81115 13.4742 6.01792 14.2697L4.30299 15.9897M12.2385 15.9644L12.6069 15.5951C13.4081 14.7996 13.8087 14.4018 14.2689 14.2554C14.6737 14.1267 15.109 14.1302 15.5117 14.2654C15.9696 14.4191 16.3638 14.8232 17.1522 15.6314L18.8889 17.3881M18.8889 17.3881L21.5377 12.8001C21.706 12.5087 21.7901 12.3629 21.823 12.208C21.8522 12.0709 21.8522 11.9293 21.823 11.7922C21.7901 11.6373 21.706 11.4915 21.5377 11.2001L17.4615 4.13984C17.2932 3.8484 17.2091 3.70268 17.0914 3.5967C16.9872 3.50293 16.8645 3.43209 16.7313 3.38879C16.5806 3.33984 16.4124 3.33984 16.0758 3.33984H7.92336C7.58683 3.33984 7.41856 3.33984 7.26793 3.38879C7.13465 3.43209 7.01196 3.50293 6.90782 3.5967C6.79011 3.70268 6.70598 3.8484 6.53772 4.13984L2.46148 11.2001C2.29321 11.4915 2.20908 11.6373 2.17615 11.7922C2.14701 11.9293 2.14701 12.0709 2.17615 12.208C2.20908 12.3629 2.29321 12.5087 2.46148 12.8001L4.30299 15.9897M18.8889 17.3881L17.4615 19.8604C17.2932 20.1518 17.2091 20.2975 17.0914 20.4035C16.9872 20.4973 16.8645 20.5681 16.7313 20.6114C16.5806 20.6604 16.4124 20.6604 16.0758 20.6604H7.92336C7.58683 20.6604 7.41856 20.6604 7.26793 20.6114C7.13465 20.5681 7.01196 20.4973 6.90782 20.4035C6.79011 20.2975 6.70598 20.1518 6.53772 19.8604L4.30299 15.9897M14.9996 8.5001C14.9996 8.77624 14.7757 9.0001 14.4996 9.0001C14.2235 9.0001 13.9996 8.77624 13.9996 8.5001C13.9996 8.22396 14.2235 8.0001 14.4996 8.0001C14.7757 8.0001 14.9996 8.22396 14.9996 8.5001Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "difficulty": `<path d="M4 8L6 20H18L20 8M4 8L5.71624 9.37299C6.83218 10.2657 7.39014 10.7121 7.95256 10.7814C8.4453 10.8421 8.94299 10.7173 9.34885 10.4314C9.81211 10.1051 10.0936 9.4483 10.6565 8.13476L12 5M4 8C4.55228 8 5 7.55228 5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8ZM20 8L18.2838 9.373C17.1678 10.2657 16.6099 10.7121 16.0474 10.7814C15.5547 10.8421 15.057 10.7173 14.6511 10.4314C14.1879 10.1051 13.9064 9.4483 13.3435 8.13476L12 5M20 8C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6C19.4477 6 19 6.44772 19 7C19 7.55228 19.4477 8 20 8ZM12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4C11 4.55228 11.4477 5 12 5ZM12 4H12.01M20 7H20.01M4 7H4.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "map_type": `<path d="M11 8L16 8.00053M11 12L16 12.0005M11 16L16 16.0005M8 16H8.01M8 12H8.01M8 8H8.01M7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.8C20 17.9201 20 18.4802 19.782 18.908C19.5903 19.2843 19.2843 19.5903 18.908 19.782C18.4802 20 17.9201 20 16.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.0799 4 7.2 4Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "mechanics": `
            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.9046 3.06005C12.6988 3 12.4659 3 12 3C11.5341 3 11.3012 3 11.0954 3.06005C10.7942 3.14794 10.5281 3.32808 10.3346 3.57511C10.2024 3.74388 10.1159 3.96016 9.94291 4.39272C9.69419 5.01452 9.00393 5.33471 8.36857 5.123L7.79779 4.93281C7.3929 4.79785 7.19045 4.73036 6.99196 4.7188C6.70039 4.70181 6.4102 4.77032 6.15701 4.9159C5.98465 5.01501 5.83376 5.16591 5.53197 5.4677C5.21122 5.78845 5.05084 5.94882 4.94896 6.13189C4.79927 6.40084 4.73595 6.70934 4.76759 7.01551C4.78912 7.2239 4.87335 7.43449 5.04182 7.85566C5.30565 8.51523 5.05184 9.26878 4.44272 9.63433L4.16521 9.80087C3.74031 10.0558 3.52786 10.1833 3.37354 10.3588C3.23698 10.5141 3.13401 10.696 3.07109 10.893C3 11.1156 3 11.3658 3 11.8663C3 12.4589 3 12.7551 3.09462 13.0088C3.17823 13.2329 3.31422 13.4337 3.49124 13.5946C3.69158 13.7766 3.96395 13.8856 4.50866 14.1035C5.06534 14.3261 5.35196 14.9441 5.16236 15.5129L4.94721 16.1584C4.79819 16.6054 4.72367 16.829 4.7169 17.0486C4.70875 17.3127 4.77049 17.5742 4.89587 17.8067C5.00015 18.0002 5.16678 18.1668 5.5 18.5C5.83323 18.8332 5.99985 18.9998 6.19325 19.1041C6.4258 19.2295 6.68733 19.2913 6.9514 19.2831C7.17102 19.2763 7.39456 19.2018 7.84164 19.0528L8.36862 18.8771C9.00393 18.6654 9.6942 18.9855 9.94291 19.6073C10.1159 20.0398 10.2024 20.2561 10.3346 20.4249C10.5281 20.6719 10.7942 20.8521 11.0954 20.94C11.3012 21 11.5341 21 12 21C12.4659 21 12.6988 21 12.9046 20.94C13.2058 20.8521 13.4719 20.6719 13.6654 20.4249C13.7976 20.2561 13.8841 20.0398 14.0571 19.6073C14.3058 18.9855 14.9961 18.6654 15.6313 18.8773L16.1579 19.0529C16.605 19.2019 16.8286 19.2764 17.0482 19.2832C17.3123 19.2913 17.5738 19.2296 17.8063 19.1042C17.9997 18.9999 18.1664 18.8333 18.4996 18.5001C18.8328 18.1669 18.9994 18.0002 19.1037 17.8068C19.2291 17.5743 19.2908 17.3127 19.2827 17.0487C19.2759 16.8291 19.2014 16.6055 19.0524 16.1584L18.8374 15.5134C18.6477 14.9444 18.9344 14.3262 19.4913 14.1035C20.036 13.8856 20.3084 13.7766 20.5088 13.5946C20.6858 13.4337 20.8218 13.2329 20.9054 13.0088C21 12.7551 21 12.4589 21 11.8663C21 11.3658 21 11.1156 20.9289 10.893C20.866 10.696 20.763 10.5141 20.6265 10.3588C20.4721 10.1833 20.2597 10.0558 19.8348 9.80087L19.5569 9.63416C18.9478 9.26867 18.6939 8.51514 18.9578 7.85558C19.1262 7.43443 19.2105 7.22383 19.232 7.01543C19.2636 6.70926 19.2003 6.40077 19.0506 6.13181C18.9487 5.94875 18.7884 5.78837 18.4676 5.46762C18.1658 5.16584 18.0149 5.01494 17.8426 4.91583C17.5894 4.77024 17.2992 4.70174 17.0076 4.71872C16.8091 4.73029 16.6067 4.79777 16.2018 4.93273L15.6314 5.12287C14.9961 5.33464 14.3058 5.0145 14.0571 4.39272C13.8841 3.96016 13.7976 3.74388 13.6654 3.57511C13.4719 3.32808 13.2058 3.14794 12.9046 3.06005Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `,
        "restrictions": `<path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "only_playtest": `<path d="M14.2639 15.9376L12.5958 14.2835C11.7909 13.4852 11.3884 13.0861 10.9266 12.9402C10.5204 12.8119 10.0838 12.8166 9.68048 12.9537C9.22188 13.1096 8.82814 13.5173 8.04068 14.3327L4.04409 18.2802M14.2639 15.9376L14.6053 15.5991C15.4112 14.7999 15.8141 14.4003 16.2765 14.2544C16.6831 14.1262 17.12 14.1312 17.5236 14.2688C17.9824 14.4252 18.3761 14.834 19.1634 15.6515L20 16.4936M14.2639 15.9376L18.275 19.9566M18.275 19.9566C17.9176 20.0001 17.4543 20.0001 16.8 20.0001H7.2C6.07989 20.0001 5.51984 20.0001 5.09202 19.7821C4.71569 19.5904 4.40973 19.2844 4.21799 18.9081C4.12796 18.7314 4.07512 18.5322 4.04409 18.2802M18.275 19.9566C18.5293 19.9257 18.7301 19.8728 18.908 19.7821C19.2843 19.5904 19.5903 19.2844 19.782 18.9081C20 18.4803 20 17.9202 20 16.8001V16.4936M12.5 4L7.2 4.00011C6.07989 4.00011 5.51984 4.00011 5.09202 4.21809C4.71569 4.40984 4.40973 4.7158 4.21799 5.09213C4 5.51995 4 6.08 4 7.20011V16.8001C4 17.4576 4 17.9222 4.04409 18.2802M20 11.5V16.4936M14 10.0002L16.0249 9.59516C16.2015 9.55984 16.2898 9.54219 16.3721 9.5099C16.4452 9.48124 16.5146 9.44407 16.579 9.39917C16.6515 9.34859 16.7152 9.28492 16.8425 9.1576L21 5.00015C21.5522 4.44787 21.5522 3.55244 21 3.00015C20.4477 2.44787 19.5522 2.44787 19 3.00015L14.8425 7.1576C14.7152 7.28492 14.6515 7.34859 14.6009 7.42112C14.556 7.4855 14.5189 7.55494 14.4902 7.62801C14.4579 7.71033 14.4403 7.79862 14.4049 7.97518L14 10.0002Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "ignore_completions": `<path d="M9 12L11 14L15 10M12 3L13.9101 4.87147L16.5 4.20577L17.2184 6.78155L19.7942 7.5L19.1285 10.0899L21 12L19.1285 13.9101L19.7942 16.5L17.2184 17.2184L16.5 19.7942L13.9101 19.1285L12 21L10.0899 19.1285L7.5 19.7942L6.78155 17.2184L4.20577 16.5L4.87147 13.9101L3 12L4.87147 10.0899L4.20577 7.5L6.78155 6.78155L7.5 4.20577L10.0899 4.87147L12 3Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "only_maps_with_medals": `<path d="M12 11L8 3H4L8.5058 12.4622M12 11L16 3H20L15.4942 12.4622M12 11C13.344 11 14.5848 11.5635 15.4942 12.4622M12 11C10.656 11 9.41518 11.5635 8.5058 12.4622M15.4942 12.4622C16.4182 13.3753 17 14.6344 17 16C17 18.7614 14.7614 21 12 21C9.23858 21 7 18.7614 7 16C7 14.6344 7.58179 13.3753 8.5058 12.4622" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`,
        "apply_filters": `<path d="M4 12.6111L8.92308 17.5L20 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "clear_filters": `<path d="M6 6L18 18M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,


    };
    return svgs[id] || "";
}

//Trad
async function loadTranslations() {
    try {
        const response = await fetch("translations/translations.json");
        const data = await response.json();
        const currentLang = document.documentElement.lang || "en";
        
        const currentLangData = data[currentLang] || {};
        
        const { thead = {}, pagination = {}, popup = {}, filters_toolbar = {}, chart = {}, mechanics = {}, restrictions = {} } = currentLangData;
        
        translations = { thead, pagination, popup, filters_toolbar, chart, mechanics, restrictions };

        //console.log("Traductions chargées :", translations);
    } catch (error) {
        console.error("Erreur lors du chargement des traductions :", error);
    }
}

function t(path, params = {}) {
    const parts = path.split('.');
    let result = translations;
    for (const part of parts) {
        result = result?.[part];
        if (!result) break;
    }
    if (!result) {
        return path;
    }
    for (const key in params) {
        result = result.replace(`{${key}}`, params[key]);
        if (!result) {
            console.error(`Clé de traduction introuvable: ${path}`);
            return path;
        }
    }
    return result;
}

//Mechanics et restrictions autocomplete
async function loadDynamicOptions() {
    try {
        // Vérifiez la langue
        const currentLang = document.documentElement.lang || "en";

        // Récupérez les options des mécaniques
        const mechanicsResponse = await fetch('./api/autocomplete/getMapMechanicsAutoComplete.php');
        if (!mechanicsResponse.ok) throw new Error('Failed to fetch mechanics');
        let mechanicsOptions = (await mechanicsResponse.json()).map(item => item.name);

        // Récupérez les options des restrictions
        const restrictionsResponse = await fetch('./api/autocomplete/getMapRestrictionsAutoComplete.php');
        if (!restrictionsResponse.ok) throw new Error('Failed to fetch restrictions');
        let restrictionsOptions = (await restrictionsResponse.json()).map(item => item.name);

        // Traduisez les options si la langue est "cn"
        if (currentLang === "cn") {
            mechanicsOptions = mechanicsOptions.map(option => t(`mechanics.${option.toLowerCase().replace(/ /g, '_')}`) || option);
            restrictionsOptions = restrictionsOptions.map(option => t(`restrictions.${option.toLowerCase().replace(/ /g, '_')}`) || option);            
        }

        // Stockez les options globalement
        window.mechanicsOptions = mechanicsOptions;
        window.restrictionsOptions = restrictionsOptions;

        //console.log('Mechanics Options:', mechanicsOptions);
        //console.log('Restrictions Options:', restrictionsOptions);
    } catch (error) {
        console.error('Error loading dynamic options:', error);
    }
}

//Search mode
async function selectSection(sectionId) {
    
    if (currentSection !== sectionId) {
        document.getElementById("resultsContainer").innerHTML = "";
        document.getElementById("paginationContainer").innerHTML = "";
    }

    currentSection = sectionId;

    if (currentSection === 'personalRecords' && !user_id) {
        showErrorMessage(t('popup.login_required_pr'));
        hideLoadingBar();
        return;
    }

    if (Object.keys(filters).length > 0 || selectedFilters.length > 0) {
        clearFilters();
    }
    
    currentPage = 1;
    document.getElementById("filterActions").style.display = "flex";

    const selectedModeText = document.getElementById("selectedMode");
    const addFilterMessage = document.getElementById("addFilterMessage");

    if (addFilterMessage) {
        addFilterMessage.style.display = "none";
    }
    
    if (sectionId === 'guide') {
        if (selectedModeText) {
            selectedModeText.style.display = "none";
            
        }
        
    } else {
        if (selectedModeText) {
            selectedModeText.style.display = "none";
        }
    }

    document.querySelectorAll('.tab-buttons button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`${sectionId}Btn`).classList.add('active');

    initializeToolbarButtons();
    applyFilters();
    clearFilters();
}

//Toolbar
async function initializeApp() {
    await loadTranslations();
    initializeIcons();
    await loadDynamicOptions();
    initializeToolbarButtons();
    hideOnClickOutside();
}

document.addEventListener("DOMContentLoaded", initializeApp);

window.addEventListener("resize", () => {
    repositionDropdowns();
    repositionInputs();
});

function clearToolbarButtons() {
    document.querySelectorAll(".toolbar-button").forEach((btn) => btn.remove());
}

function repositionDropdowns() {
    const visibleOptions = document.querySelectorAll(".custom-options.show");

    visibleOptions.forEach((optionsContainer) => {
        const buttonId = optionsContainer.dataset.buttonId || optionsContainer.id.replace("Options", "FilterButton");
        const button = document.getElementById(buttonId);

        //console.log(`Repositionnement de ${optionsContainer.id} avec le bouton ${buttonId}`, button);

        if (!button) {
            //console.warn(`Bouton introuvable pour ${buttonId}`);
            return;
        }

        const buttonRect = button.getBoundingClientRect();
        const optionsWidth = optionsContainer.scrollWidth || 160;
        const centerOffset = (buttonRect.width - optionsWidth) / 2;

        optionsContainer.style.position = "absolute";
        optionsContainer.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;
        optionsContainer.style.left = `${buttonRect.left + centerOffset}px`;

        const dropdownRect = optionsContainer.getBoundingClientRect();
        const screenWidth = window.innerWidth;

        if (dropdownRect.right > screenWidth) {
            optionsContainer.style.left = `${screenWidth - dropdownRect.width - 10}px`;
        } else if (dropdownRect.left < 0) {
            optionsContainer.style.left = `10px`;
        }
    });
}


function repositionInputs() {
    const visibleInputs = document.querySelectorAll(".filter-input");

    visibleInputs.forEach((input) => {
        if (input.style.display !== "block") return;

        const parentButtonId = input.getAttribute("data-parent");
        const button = document.getElementById(parentButtonId);

        if (button) {
            const buttonRect = button.getBoundingClientRect();
            const inputWidth = input.offsetWidth || 150;
            const centerOffset = (buttonRect.width - inputWidth) / 2;

            input.style.position = "absolute";
            input.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;
            input.style.left = `${buttonRect.left + centerOffset}px`;
        }
    });
}

function hideOnClickOutside() {
    document.addEventListener("click", (event) => {
        const isClickInsideToolbar = toolbar.contains(event.target);
        const isClickInsideDropdown = event.target.closest(".custom-options");
        const isClickInsideInput = event.target.closest(".filter-input");

        if (!isClickInsideToolbar && !isClickInsideDropdown && !isClickInsideInput) {
            document.querySelectorAll(".custom-options").forEach((el) => {
                el.style.display = "none";
                el.classList.remove("show");
            });

            document.querySelectorAll(".filter-input").forEach((el) => {
                el.style.display = "none";
            });

            document.querySelectorAll(".suggestions-container").forEach((el) => {
                el.style.display = "none";
            });

            const selectionCircle = document.querySelector(".selection-circle");
            if (selectionCircle) {
                selectionCircle.style.opacity = "0";
            }

            document.querySelectorAll(".toolbar-button").forEach((btn) =>
                btn.classList.remove("selected")
            );
        }
    });
}

//Fix selection circle
function moveSelectionCircle(targetButton) {
    const selectionCircle = document.querySelector(".selection-circle");

    if (!selectionCircle || !targetButton) return;

    const specialButtons = [
        "ignore_completionsFilterButton",
        "only_medalsFilterButton",
        "apply_filtersFilterButton",
        "clear_filtersFilterButton"
    ];

    const isSmallScreen = window.matchMedia("(max-width: 1024px)").matches;
    const isVerySmallScreen = window.matchMedia("(max-width: 480px)").matches;

    let offsetY = "16.5%";

    if (currentSection === "mapSearch") {
        if (isVerySmallScreen && targetButton.id === "only_playtestFilterButton") {
            offsetY = "48px";
        } else if (isSmallScreen && specialButtons.includes(targetButton.id)) {
            offsetY = "48px";
        } else if (isSmallScreen) {
            offsetY = "8.5%";
        }
    } else if (isSmallScreen || isVerySmallScreen) {
        offsetY = "16.5%";
    }

    selectionCircle.style.left = `0px`;
    selectionCircle.style.top = offsetY;
    selectionCircle.style.opacity = "1";
}

function attachButtonListeners() {
    const buttons = document.querySelectorAll(".toolbar-button");

    if (buttons.length === 0) {
        setTimeout(attachButtonListeners, 100);
        return;
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".toolbar-button").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            moveSelectionCircle(button);
        });
    });
}

const observer = new MutationObserver(attachButtonListeners);

document.addEventListener("DOMContentLoaded", () => {
    const toolbar = document.querySelector(".toolbar");

    if (toolbar) {
        observer.observe(toolbar, { childList: true, subtree: true });
        attachButtonListeners();
    }
});

//Création toolbar
function initializeToolbarButtons() {
    clearToolbarButtons();

    const sectionIconsMap = {
        mapSearch: icons.filter(icon => icon.id !== 'user'),
        completions: icons.filter(icon => ['map_code', 'user', 'apply_filters', 'clear_filters'].includes(icon.id)),
        guide: icons.filter(icon => ['map_code', 'apply_filters', 'clear_filters'].includes(icon.id)),
        personalRecords: icons.filter(icon => ['map_code', 'apply_filters', 'clear_filters'].includes(icon.id))
    };

    const filteredIcons = sectionIconsMap[currentSection] || icons;

    filteredIcons.forEach((icon) => {
        const button = createButton(icon);
        toolbar.appendChild(button);

        button.addEventListener("click", () => {
            hideAllFilters();
            hideAllActiveSuggestions();

            button.classList.add("selected");

            const buttonRect = button.getBoundingClientRect();
            const buttonId = button.id;
            const toolbarRect = toolbar.getBoundingClientRect();
            const offsetLeft = buttonRect.left - toolbarRect.left;

            circle.style.opacity = 1;
            circle.style.transform = `translateX(${offsetLeft}px)`;
            iconName.textContent = icon.name;

            let input, optionsContainer;

            switch (icon.id) {
                case "map_code":
                    input = getOrCreateInput("mapCodeInput", t("filters_toolbar.enter_map_code"), buttonId);
                    input.addEventListener("input", (event) =>
                        showSuggestions(event, "getMapCodesAutoComplete.php", "mapCodeSuggestionsContainer", "map_code")
                    );
                    break;

                case "creator":
                    input = getOrCreateInput("mapCreatorInput", t("filters_toolbar.enter_creator"), buttonId);
                    input.addEventListener("input", (event) =>
                        showSuggestions(event, "getUsersAutoComplete.php", "creatorSuggestionsContainer", "name")
                    );
                    break;

                case "map_name":
                    input = getOrCreateInput("mapNameInput", t("filters_toolbar.enter_map_name"), buttonId);
                    input.addEventListener("input", (event) =>
                        showSuggestions(event, "getMapNamesAutoComplete.php", "mapNameSuggestionsContainer", "name")
                    );
                    break;
                case "user":
                    input = getOrCreateInput("userNicknameInput", t("filters_toolbar.enter_nickname"), buttonId);
                    input.addEventListener("input", (event) =>
                        showSuggestions(event, "getUsersAutoComplete.php", "nicknameSuggestionsContainer", "name")
                    );
                    break;

                case "difficulty":
                    optionsContainer = showOptionsContainer(
                        "difficultyOptions",
                        [
                            t("filters_toolbar.beginner"),
                            t("filters_toolbar.easy"),
                            t("filters_toolbar.medium"),
                            t("filters_toolbar.hard"),
                            t("filters_toolbar.very_hard"),
                            t("filters_toolbar.extreme"),
                            t("filters_toolbar.hell")],
                        buttonRect
                    );
                    break;

                case "map_type":
                    optionsContainer = showOptionsContainer(
                        "mapTypeOptions",
                        [t("filters_toolbar.classic"), t("filters_toolbar.increasing_difficulty"), t("filters_toolbar.tournament")],
                        buttonRect
                    );
                    break;

                case "mechanics":
                    optionsContainer = showOptionsContainer(
                        "mechanicsOptions",
                        window.mechanicsOptions || [],
                        buttonRect,
                        true
                    );
                    break;

                case "restrictions":
                    optionsContainer = showOptionsContainer(
                        "restrictionsOptions",
                        window.restrictionsOptions || [],
                        buttonRect,
                        true
                    );
                    break;

                case "ignore_completions":
                    optionsContainer = showOptionsContainer(
                        "ignoreCompletionsOptions",
                        [t("filters_toolbar.only_true"), t("filters_toolbar.only_false")],
                        buttonRect
                    );
                    break;

                case "only_playtest":
                    optionsContainer = showOptionsContainer(
                        "onlyPlaytestOptions",
                        [t("filters_toolbar.only_true"), t("filters_toolbar.only_false")],
                        buttonRect
                    );
                    break;

                case "only_maps_with_medals":
                    optionsContainer = showOptionsContainer(
                        "onlyMedalsOptions",
                        [t("filters_toolbar.only_true"), t("filters_toolbar.only_false")],
                        buttonRect
                    );
                    break;

                case "apply_filters":
                    applyFilters(activeFilters);
                    break;

                case "clear_filters":
                    clearFilters();
                    break;
            }

            positionInputOrDropdown(input, optionsContainer, buttonRect);
        });
    });
}

function hideAllFilters() {
    document.querySelectorAll(".filter-input, .custom-options").forEach((el) => {
        el.style.display = "none";
        el.classList.remove("show");
    });

    document.querySelectorAll(".toolbar-button").forEach((btn) => {
        btn.classList.remove("selected");
    });
}

function hideAllActiveSuggestions() {
    document.querySelectorAll(".suggestions-container").forEach((el) => {
        el.style.display = "none";
        el.classList.remove("active");
    });
}

function getOrCreateInput(id, placeholder, parentButtonId) {
    let input = document.getElementById(id);

    if (!input) {
        input = document.createElement("input");
        input.type = "text";
        input.placeholder = t(placeholder) || placeholder;
        input.id = id;
        input.classList.add("filter-input");
        input.setAttribute("data-parent", parentButtonId);

        document.body.appendChild(input);
    }

    return input;
}

function positionInputOrDropdown(input, optionsContainer, buttonRect) {
    const inputWidth = 150;
    const centerOffset = (buttonRect.width - inputWidth) / 2;

    if (input) {
        input.style.position = "absolute";
        input.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;
        input.style.left = `${buttonRect.left + centerOffset}px`;
        input.style.display = "block";
    }

    if (optionsContainer) {
        const optionsWidth = optionsContainer.offsetWidth || 160;
        const dropdownCenterOffset = (buttonRect.width - optionsWidth) / 2;

        optionsContainer.style.position = "absolute";
        optionsContainer.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;
        optionsContainer.style.left = `${buttonRect.left + dropdownCenterOffset}px`;
        optionsContainer.style.display = "block";
        optionsContainer.classList.add("show");
    }
}

function createButton(icon) {
    const button = document.createElement("button");
    button.classList.add("toolbar-button");
    button.setAttribute("data-name", icon.name);
    button.setAttribute("id", `${icon.id}FilterButton`); 
    button.innerHTML = `
        <svg viewBox="${icon.viewBox || "0 0 24 24"}" xmlns="http://www.w3.org/2000/svg">
            ${icon.svg}
        </svg>
        <div class="icon-name">${icon.name}</div>
    `;
    return button;
}

function showOptionsContainer(id, options, buttonRect, useWrapper = false) {
    let optionsContainer = document.getElementById(id);

    if (!optionsContainer) {
        optionsContainer = createOptionsContainer(id, options, useWrapper);
        document.body.appendChild(optionsContainer);
    }

    const optionsWidth = optionsContainer.offsetWidth || 160;
    const centerOffset = (buttonRect.width - optionsWidth) / 2;

    optionsContainer.style.position = "absolute";
    optionsContainer.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;
    optionsContainer.style.left = `${buttonRect.left + centerOffset}px`;
    optionsContainer.style.display = "block";
    optionsContainer.classList.add("show");

    optionsContainer.querySelectorAll(".custom-option").forEach(option => {
        option.addEventListener("click", () => {
            let labelId = "";
            switch (id.replace("Options", "")) {
                case "mapType":
                    labelId = "map type";
                    break;
                case "difficulty":
                    labelId = "difficulty";
                    break;
                case "mechanics":
                    labelId = "mechanics";
                    break;
                case "restrictions":
                    labelId = "restrictions";
                    break;
                case "onlyPlaytest":
                    labelId = "only playtest";
                    break;
                case "ignoreCompletions":
                    labelId = "ignore completions";
                    break;
                case "onlyMedals":
                    labelId = "only medals";
                    break;
                default:
                    labelId = id.replace("Options", "");
            }
            const translatedMessage = t("popup.filter_applied", {
                filterId: labelId,
                value: option.textContent.trim()
            });
            showConfirmationMessage(translatedMessage);
            updateActiveFilters();
        });
    });

    return optionsContainer;
}

function createOptionsContainer(id, options, useWrapper = false) {
    const optionsContainer = document.createElement("div");
    optionsContainer.id = id;
    optionsContainer.className = "custom-options";

    options.forEach((optionText) => {
        let optionWrapper, option, checkbox;

        if (useWrapper) {
            optionWrapper = document.createElement("div");
            optionWrapper.className = "custom-option-wrapper";

            checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "custom-checkbox";
            checkbox.id = `${id}_${optionText.replace(/\s+/g, "_")}`;

            option = document.createElement("label");
            option.className = "custom-option";
            option.textContent = optionText;
            option.setAttribute("for", checkbox.id);

            optionWrapper.appendChild(checkbox);
            optionWrapper.appendChild(option);
            optionsContainer.appendChild(optionWrapper);
        } else {
            option = document.createElement("div");
            option.className = "custom-option";
            option.textContent = optionText;

            option.addEventListener("click", () => {
                optionsContainer.querySelectorAll(".custom-option").forEach((opt) =>
                    opt.classList.remove("selected")
                );
                option.classList.add("selected");
                optionsContainer.style.display = "none";
            });

            optionsContainer.appendChild(option);
        }
    });

    return optionsContainer;
}

function createInput(id, placeholder, parentButtonId) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;
    input.id = id;
    input.classList.add("filter-input");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("autocorrect", "off");
    input.setAttribute("autocapitalize", "off");
    input.setAttribute("spellcheck", "false");
    
    input.setAttribute("data-parent", parentButtonId); 

    document.body.appendChild(input);
    return input;
}

//Maj filtres
function updateActiveFilters() {
    const filterMappings = {
        mapCode: "map_code",
        mapName: "map_name",
        mapType: "map_type",
        mapCreator: "creator",
        nickname: "user",
        mapDifficulty: "difficulty",
        mapQuality: "minimum_quality",
        onlyPlaytest: "only_playtest",
        onlyMedals: "only_maps_with_medals",
        mechanics: "mechanics",
        restrictions: "restrictions",
        ignoreCompletions: "ignore_completions",
    };

    activeFilters = { ...persistentFilters };

    document.querySelectorAll('.custom-options').forEach((optionsContainer) => {
        const filterId = optionsContainer.id.replace("Options", "");
        const mappedFilterId = filterMappings[filterId] || filterId;

        if (["only_playtest", "only_maps_with_medals", "ignore_completions"].includes(filterId)) {
            const selectedOption = optionsContainer.querySelector('.custom-option.selected');
            if (selectedOption) {
                activeFilters[mappedFilterId] = selectedOption.textContent.trim().toLowerCase() === 'true';
                return;
            }
        }

        if (filterId === "mechanics" || filterId === "restrictions") {
            setTimeout(() => {
                const checkboxes = optionsContainer.querySelectorAll('.custom-checkbox:checked');
                if (checkboxes.length > 0) {
                    activeFilters[mappedFilterId] = Array.from(checkboxes).map(cb => cb.nextElementSibling.textContent.trim());
                } else {
                    delete activeFilters[mappedFilterId];
                }
            }, 0);
            return;
        }

        const selectedOption = optionsContainer.querySelector('.custom-option.selected');
        if (selectedOption) {
            activeFilters[mappedFilterId] = encodeURIComponent(selectedOption.textContent.trim());
            return;
        }
    });

    const textInputs = {
        mapCodeInput: "map_code",
        mapNameInput: "map_name",
        mapCreatorInput: "creator",
        userNicknameInput: "user"
    };

    for (const [inputId, filterKey] of Object.entries(textInputs)) {
        const input = document.getElementById(inputId);
        if (input && input.value.trim()) {
            activeFilters[filterKey] = encodeURIComponent(input.value.trim());
        } else {
            delete activeFilters[filterKey];
        }
    }

    //console.log("Filtres actifs mis à jour :", activeFilters);
    setTimeout(updateToolbarButtonStates, 0);
}

function updateToolbarButtonStates() {
    const buttons = document.querySelectorAll(".toolbar-button");

    buttons.forEach((button) => {
        const filterId = button.id.replace("FilterButton", "").toLowerCase();
        const isActive = !!activeFilters[filterId];

        //console.log(`Etat bouton : ${filterId}, Actif: ${isActive}`);

        if (isActive) {
            button.classList.add("active-filter");
        } else {
            button.classList.remove("active-filter");
        }
    });
}

//Reset filtres
function removeFilter(filterId, filterElement) {
    const index = selectedFilters.indexOf(filterId);
    if (index !== -1) {
        selectedFilters.splice(index, 1);
        filterElement.remove();
    }
}

function clearFilters() {
    const hasActiveFilters = Object.keys(activeFilters).some(key => key !== 'page_size' && key !== 'page_number') || selectedFilters.length > 0;
    const clearFiltersButton = document.getElementById("clear_filtersFilterButton");

    selectedFilters.length = 0;
    currentPage = 1;
    activeFilters = {};
    filters = {};

    document.getElementById("filtersContainer").innerHTML = "";
    const resultsContainer = document.querySelector(".results-container");
    if (resultsContainer) {
        //resultsContainer.innerHTML = "";
    }

    const paginationContainer = document.getElementById("paginationContainer");
    paginationContainer.innerHTML = "";

    const mapCodeInput = document.getElementById("mapCodeInput");
    const mapNameInput = document.getElementById("mapNameInput");
    const creatorInput = document.getElementById("mapCreatorInput");
    const nicknameInput = document.getElementById("userNicknameInput");

    if (mapCodeInput) mapCodeInput.value = "";
    if (mapNameInput) mapNameInput.value = "";
    if (creatorInput) creatorInput.value = "";
    if (nicknameInput) nicknameInput.value = "";

    document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    })

    document.querySelectorAll('.custom-option.selected').forEach(option => {
        option.classList.remove('selected');
    });
    
    document.querySelectorAll(".toolbar-button").forEach(button => {
        button.classList.remove("active-filter");
    });

    if (clearFiltersButton) {
        clearFiltersButton.onclick = () => {
            if (hasActiveFilters) {
                showConfirmationMessage(t("popup.filters_cleared"));
            }
        };
    }
}

//Appliquer filtres
async function applyFilters(filters) {
    cachedPages = {};

    activeFilters = { ...persistentFilters, ...filters };

    if (user_id) {
        activeFilters.user_id = user_id;
    }

    if (currentSection === 'guide') {
        const hasFilters = filters && Object.keys(filters).length > 0;
        const hasActiveMapCode = activeFilters && activeFilters.map_code;

        if (!hasFilters && !hasActiveMapCode) {
            if (!activeFilters) {
                activeFilters = {};
            }

            if (!activeFilters.map_code) {
                activeFilters.map_code = "008EX";
            } else {
                showErrorMessage(t('popup.map_code_required'));
                hideLoadingBar();
                return;
            }
        }
    }

    activeFilters.page_size = pageSize;
    activeFilters.page_number = currentPage;

    showLoadingBar();

    const apiUrl = apiUrls[currentSection];
    const requestQueryString = new URLSearchParams(activeFilters).toString();
    const fullApiUrl = `${apiUrl}?${requestQueryString}`;
    
    //console.log("URL envoyée à l'API :", fullApiUrl);
    //console.log("Filtres envoyés :", activeFilters);
    const intuitiveModeText = document.getElementById("intuitiveMode");
    if (intuitiveModeText) {
        intuitiveModeText.style.display = "none";
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activeFilters)
        });

        if (!response.ok) {
            throw new Error('Erreur réseau : ' + response.statusText);
        }

        const data = await response.json();
        totalPages = data.pagination?.total_pages || 1;

        cachedPages[currentSection] = { 1: data };
        //console.log("Résultats : ", data);
        displayResults(data);
        renderPaginationButtons();

        const secondPageData = await fetchPageData(2);
        if (secondPageData && Array.isArray(secondPageData.results) && secondPageData.results.length > 0) {
        }
    } catch (error) {
        console.error("Erreur lors de l'application des filtres :", error);
    } finally {
        hideLoadingBar();
    }
}

function displayResults(data) {
    switch (currentSection) {
        case 'mapSearch':
            displayMapSearchResults(data);
            break;
        case 'completions':
            displayCompletionsResults(data);
            break;
        case 'guide':
            displayGuideResults(data);
            break;
        case 'personalRecords':
            displayPersonalRecordsResults(data);
            break;
        default:
            console.error("Section non prise en charge:", currentSection);
    }
}

function showLoadingBar() {
    const loadingContainer = document.getElementById("loadingContainer");
    if (loadingContainer) {
        loadingContainer.style.display = "flex";
        loadingContainer.style.opacity = "0";
        loadingContainer.style.transition = "opacity 0.2s ease-in";
        
        requestAnimationFrame(() => {
            loadingContainer.style.opacity = "1";
        });
    }
}

function hideLoadingBar() {
    const loadingContainer = document.getElementById("loadingContainer");
    if (loadingContainer) {
        loadingContainer.style.transition = "opacity 0.2s ease-out";
        loadingContainer.style.opacity = "0";

        setTimeout(() => {
            loadingContainer.style.display = "none";
        }, 200);
    }
}

// Suggestions
function showSuggestions(event, apiEndpoint, containerId, propertyName) {
    const input = event.target;
    const filterValue = input.value.trim();
    const suggestionsContainer = getSuggestionsContainer(containerId, input);

    clearTimeout(debounceTimeout);

    if (filterValue.length < 2) {
        suggestionsContainer.style.display = "none";
        return;
    }

    debounceTimeout = setTimeout(() => {
        //console.log(`Fetching from ${apiEndpoint} with value:`, filterValue);

        fetch(`api/autocomplete/${apiEndpoint}?value=${encodeURIComponent(filterValue)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                //console.log("Fetched data:", data);
                suggestionsContainer.innerHTML = "";

                if (!Array.isArray(data) || data.length === 0) {
                    suggestionsContainer.style.display = "none";
                    return;
                }

                data.forEach(item => {
                    if (item[propertyName]) {
                        const suggestion = document.createElement("div");
                        suggestion.textContent = item[propertyName];
                        suggestion.classList.add("suggestion-item");

                        suggestion.addEventListener("click", () => {
                            input.value = item[propertyName];

                            let labelId = "";
                            switch (propertyName) {
                                case "map_code":
                                    labelId = "map code";
                                    break;
                                case "map_name":
                                    labelId = "map name";
                                    break;
                                case "creator":
                                    labelId = "creator";
                                    break;
                                default:
                                    labelId = propertyName;
                            }

                            const translatedMessage = t("popup.filter_applied", {
                                filterId: labelId,
                                value: item[propertyName]
                            });

                            showConfirmationMessage(translatedMessage);
                            suggestionsContainer.style.display = "none";
                            updateActiveFilters();
                        });

                        suggestionsContainer.appendChild(suggestion);
                    }
                });

                suggestionsContainer.style.display = suggestionsContainer.children.length > 0 ? "block" : "none";
            })
            .catch(error => {
                console.error(`Error fetching ${apiEndpoint} suggestions:`, error);
            });
    }, 200);
}

function getSuggestionsContainer(containerId, input) {
    let suggestionsContainer = document.getElementById(containerId);

    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement("div");
        suggestionsContainer.id = containerId;
        suggestionsContainer.classList.add("suggestions-container");
        document.body.appendChild(suggestionsContainer);
    }

    const inputRect = input.getBoundingClientRect();
    const inputWidth = input.offsetWidth;

    suggestionsContainer.style.position = "absolute";
    suggestionsContainer.style.top = `${inputRect.bottom + window.scrollY + 5}px`;
    suggestionsContainer.style.left = `${inputRect.left + window.scrollX}px`;
    suggestionsContainer.style.width = `${inputWidth}px`;

    return suggestionsContainer;
}

//Affichage
function normalizeDifficulty(difficulty) {
    if (!difficulty) return '';
    return difficulty.replace(/\s*[+-]$/, '').trim();
}

function displayMapSearchResults(data) {
    const resultsContainer = document.getElementById("resultsContainer");

    const results = Object.values(data).filter(item => typeof item === "object" && !item.pagination);
    const filteredResults = results.filter(result => result.map_name && result.map_name !== "N/A");
    //console.log("Affichage des résultats", filteredResults);

    if (filteredResults.length === 0) {
        showErrorMessage(t("popup.no_results"));
        return;
    }

    const getStars = (quality, maxStars = 6) => {
        let stars = '';
        const starCount = Math.floor(quality);
        const emptyStarCount = maxStars - starCount;
    
        for (let i = 0; i < starCount; i++) {
            stars += '<span class="star-full">★</span>';
        }
    
        for (let i = 0; i < emptyStarCount; i++) {
            stars += '<span class="star-empty">☆</span>';
        }
    
        return stars || 'N/A';
    };

    resultsContainer.innerHTML = `
        <table class="results-table">
            <colgroup>
                <col style="width: 10%;">
                <col style="width: 17%;">
                <col style="width: 8%;">
                <col style="width: 15%;">
                <col style="width: 10%;" class="hidden-mobile">
                <col style="width: 10%;" class="hidden-mobile">
                <col style="width: 5%;" class="hidden-mobile">
                <col style="width: 5%;" class="hidden-mobile">
                <col style="width: 7%;" class="hidden-mobile">
                <col style="width: 9%;">
            </colgroup>
            <thead>
                <tr>
                    <th class="mapCode">${t("thead.mapCode")}</th>
                    <th class="mapName">${t("thead.mapName")}</th>
                    <th class="mapType">${t("thead.mapType")}</th>
                    <th class="mapCreator">${t("thead.mapCreator")}</th>
                    <th class="mapDifficulty hidden-mobile">${t("thead.mapDifficulty")}</th>
                    <th class="mapQuality hidden-mobile">${t("thead.mapQuality")}</th>
                    <th class="mapGold hidden-mobile">${t("thead.mapGold")}</th>
                    <th class="mapSilver hidden-mobile">${t("thead.mapSilver")}</th>
                    <th class="mapBronze hidden-mobile">${t("thead.mapBronze")}</th>
                    <th class="mapDetails">${t("thead.mapDetails")}</th>
                </tr>
            </thead>
            <tbody>
                ${filteredResults.map((result, index) => {
                    let medalType = "";

                    if (user_id) {
                        if (result.medal_type === "Gold") {
                            medalType = "gold-halo";
                        } else if (result.medal_type === "Silver") {
                            medalType = "silver-halo";
                        } else if (result.medal_type === "Bronze") {
                            medalType = "bronze-halo";
                        } else {
                            medalType = "";
                        }
                    } else {
                        medalType = "";
                    }

                    return `
                        <tr>
                            <td colspan="10" class="row-wrapper">
                                <table class="inner-table ${medalType}">
                                    <colgroup>
                                        <col style="width: 10%;">
                                        <col style="width: 17%;">
                                        <col style="width: 8%;">
                                        <col style="width: 15%;">
                                        <col style="width: 10%;" class="hidden-mobile">
                                        <col style="width: 10%;" class="hidden-mobile">
                                        <col style="width: 6%;" class="hidden-mobile">
                                        <col style="width: 6%;" class="hidden-mobile">
                                        <col style="width: 6%;" class="hidden-mobile">
                                        <col style="width: 8%;">
                                    </colgroup>
                                    <tr>
                                        <td class="mapCode">
                                            ${result.map_code || "N/A"} 
                                            ${(result.time && user_id) ? '<span style="color: green; margin-left: 5px;">✔</span>' : ''}
                                        </td>
                                        <td class="mapName">${result.map_name || "N/A"}</td>
                                        <td class="mapType">${Array.isArray(result.map_type) ? result.map_type.join(", ") : "N/A"}</td>
                                        <td class="creators">${result.creators ? result.creators.join(", ") : "N/A"}</td>
                                        <td class="difficulty hidden-mobile" style="color: ${difficultyColors[normalizeDifficulty(result.difficulty)] || '#fff'}">${result.difficulty || "N/A"}</td>
                                        <td class="quality hidden-mobile">${getStars(result.quality) || "N/A"}</td>
                                        <td class="gold hidden-mobile">${result.gold || "N/A"}</td>
                                        <td class="silver hidden-mobile">${result.silver || "N/A"}</td>
                                        <td class="bronze hidden-mobile">${result.bronze || "N/A"}</td>
                                        <td class="details"><button class="details-btn" onclick="showDetailsModal(${index})">View</button></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    `;
                }).join("")}
            </tbody>
        </table>
    `;

    document.body.insertAdjacentHTML('beforeend', `
        <div id="detailsModalOverlay" class="modal-overlay-custom" style="display:none;">
            <div id="detailsModalBox" class="modal-box-custom">
                <span id="detailsModalClose" class="modal-close-button" onclick="closeDetailsModal()">&times;</span>
                <div id="modalDetailsContainer"></div>
            </div>
        </div>
    `);

    window.showDetailsModal = async function(index) {
        const result = filteredResults[index];
    
        let mechanicsOptions = result.mechanics || [];
        let restrictionsOptions = result.restrictions || [];
    
        const currentLang = document.documentElement.lang || "en";
    
        if (currentLang === "cn") {
            mechanicsOptions = mechanicsOptions.map(option => t(`mechanics.${option.toLowerCase().replace(/ /g, '_')}`) || option);
            restrictionsOptions = restrictionsOptions.map(option => t(`restrictions.${option.toLowerCase().replace(/ /g, '_')}`) || option);            
        }
    
        const mechanics = mechanicsOptions.length ? mechanicsOptions.join(", ") : "N/A";
        const restrictions = restrictionsOptions.length ? restrictionsOptions.join(", ") : "N/A";
        const description = result.desc || "No description available";
    
        const mapName = result.map_name ? result.map_name.toLowerCase().replace(/[()\s]/g, "") : "default";
        const bannerPath = `assets/banners/${mapName}.png`;
    
        const medals = [];
        if (result.gold && result.gold !== "N/A") {
            medals.push(`
                <div class="medal-wrapper">
                    <img src="assets/verifications/gold_wr.gif" alt="Gold Medal" class="medal-image" />
                    <span class="medal-time">${result.gold}</span>
                </div>
            `);
        }
        if (result.silver && result.silver !== "N/A") {
            medals.push(`
                <div class="medal-wrapper">
                    <img src="assets/verifications/silver_wr.gif" alt="Silver Medal" class="medal-image" />
                    <span class="medal-time">${result.silver}</span>
                </div>
            `);
        }
        if (result.bronze && result.bronze !== "N/A") {
            medals.push(`
                <div class="medal-wrapper">
                    <img src="assets/verifications/bronze_wr.gif" alt="Bronze Medal" class="medal-image" />
                    <span class="medal-time">${result.bronze}</span>
                </div>
            `);
        }
    
        const detailsContent = `
            <div id="modalContentFrame" class="modal-content-frame">
                <div id="modalLayout" class="modal-layout">
                    <div class="map-details">
                        <div id="modalTextSection" class="modal-text-section">
                            <h2>${t("thead.mapDetails")}</h2>
                            <p><strong>${t("thead.mapCode")}:</strong> ${result.map_code || "N/A"}</p>
                            <p><strong>${t("thead.mapName")}:</strong> ${result.map_name || "N/A"}</p>
                            <p><strong>${t("thead.mapType")}:</strong> ${Array.isArray(result.map_type) ? result.map_type.join(", ") : "N/A"}</p>
                            <p><strong>${t("thead.mapCreator")}:</strong> ${result.creators ? result.creators.join(", ") : "N/A"}</p>
                            <p><strong>${t("thead.mapDifficulty")}:</strong> <span style="color: ${difficultyColors[normalizeDifficulty(result.difficulty)] || '#fff'}"> ${result.difficulty || "N/A"}</span></p>
                            <p><strong>${t("thead.mapCheckpoints")}:</strong> ${result.checkpoints || t('common.na')}</p>
                            <p><strong>${t("thead.mapQuality")}:</strong> <span class="modal-stars">${getStars(result.quality) || "N/A"}</span></p>
                            <p><strong>${t("thead.mapMechanics")}:</strong> ${mechanics}</p>
                            <p><strong>${t("thead.mapRestrictions")}:</strong> ${restrictions}</p>
                            <p><strong>${t("thead.mapDescription")}:</strong> ${description}</p>
                        </div>
                        <div id="modalBannerSection" class="modal-banner-section">
                            <img src="${bannerPath}" alt="${mapName} Banner" class="modal-banner-image" onerror="this.style.display='none'" />
                            <div class="medals-container">
                                ${medals.join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="map-graph">
                    <div id="chartContainer">
                    </div>
                </div>
            </div>
        `;
    
        document.getElementById("modalDetailsContainer").innerHTML = detailsContent;
        document.getElementById("detailsModalOverlay").style.display = "flex";
    
        const [stats, progressionData] = await Promise.all([
            fetchMapCompletionStatistics(result.map_code),
            fetchProgression(result.map_code),
        ]);
    
        if (stats && Array.isArray(progressionData) && progressionData.length > 0) {
            renderProgressionChart(progressionData, stats);
        } else {
            console.log("No valid data to render chart");
        }
    };
    

    window.closeDetailsModal = function() {
        document.getElementById("detailsModalOverlay").style.display = "none";
    };
    document.getElementById("detailsModalOverlay").addEventListener("click", function(event) {
        if (event.target === this) {
            closeDetailsModal();
        }
    });
}

function displayPersonalRecordsResults(results) {
    const resultsContainer = document.getElementById("resultsContainer");
    const dataResults = Array.isArray(results.results) ? results.results : [];
    const filteredResults = dataResults.filter(result => result.map_code && result.map_code !== "N/A");

    if (filteredResults.length === 0) {
        showErrorMessage(t("popup.no_results"));
        return;
    }

    resultsContainer.innerHTML = `
        <table class="results-table3">
            <colgroup>
                <col style="width: 15%;">
                <col style="width: 20%;">
                <col style="width: 20%;">
                <col style="width: 15%;">
                <col style="width: 15%;">
                <col style="width: 15%;">
            </colgroup>
            <thead>
                <tr>
                    <th class="mapCode">${t("thead.mapCode")}</th>
                    <th class="nickname">${t("thead.mapNickname")}</th>
                    <th class="discordTag">${t("thead.mapDiscordTag")}</th>
                    <th class="difficulty">${t("thead.mapDifficulty")}</th>
                    <th class="time">${t("thead.mapTime")}</th>
                    <th class="medal">${t("thead.mapMedal")}</th>
                </tr>
            </thead>
            <tbody>
                ${filteredResults.map(result => `
                    <tr>
                        <td colspan="10" class="row-wrapper3">
                            <table class="inner-table3">
                                <colgroup>
                                    <col style="width: 15%;">
                                    <col style="width: 20%;">
                                    <col style="width: 20%;">
                                    <col style="width: 15%;">
                                    <col style="width: 15%;">
                                    <col style="width: 15%;">
                                </colgroup>
                                <tr>
                                    <td class ="mapCode">${result.map_code || "N/A"}</td>
                                    <td class ="nickname">${result.nickname || "N/A"}</td>
                                    <td class ="discord_tag">${result.discord_tag || "N/A"}</td>
                                    <td class="difficulty" style="color: ${difficultyColors[normalizeDifficulty(result.difficulty)] || '#fff'}">${result.difficulty || "N/A"}</td>
                                    <td class ="time">${result.time > 16000 ? "Completion" : result.time}</td>
                                    <td class ="medal">${result.medal || "N/A"}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>`;
}

function displayCompletionsResults(results) {
    const resultsContainer = document.getElementById("resultsContainer");
    const dataResults = Array.isArray(results.results) ? results.results : [];
    const filteredResults = dataResults.filter(result => result.map_code && result.map_code !== "N/A");

    if (filteredResults.length === 0) {
        showErrorMessage(t("popup.no_results"));
        return;
    }

    resultsContainer.innerHTML = `
        <table class="results-table2">
            <colgroup>
                <col style="width: 15%;">
                <col style="width: 20%;">
                <col style="width: 20%;">
                <col style="width: 15%;">
                <col style="width: 15%;">
                <col style="width: 15%;">
            </colgroup>
            <thead>
                <tr>
                    <th class="mapCode">${t("thead.mapCode")}</th>
                    <th class="nickname">${t("thead.mapNickname")}</th>
                    <th class="discordTag">${t("thead.mapDiscordTag")}</th>
                    <th class="time">${t("thead.mapTime")}</th>
                    <th class="medal">${t("thead.mapMedal")}</th>
                    <th class="video">${t("thead.mapVideo")}</th>
                </tr>
            </thead>
            <tbody>
                ${dataResults.map(result => `
                    <tr>
                        <td colspan="10" class="row-wrapper2">
                            <table class="inner-table2">
                                <colgroup>
                                    <col style="width: 15%;">
                                    <col style="width: 20%;">
                                    <col style="width: 20%;">
                                    <col style="width: 15%;">
                                    <col style="width: 15%;">
                                    <col style="width: 15%;">
                                </colgroup>
                               <tr>
                                    <td class="mapCode">${result.map_code || "N/A"}</td>
                                    <td class="nickname">${result.nickname || "N/A"}</td>
                                    <td class="discord_tag">${result.discord_tag || "N/A"}</td>
                                    <td class="time">${result.time > 16000 ? "Completion" : result.time}</td>
                                    <td class="medal">${result.medal || "N/A"}</td>
                                    <td class="video">${result.video ? `<a href="${result.video}" target="_blank" class="white-link">Watch</a>` : "N/A"}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>`;
}

function displayGuideResults(results) {
    const resultsContainer = document.getElementById("resultsContainer");
    const dataResults = Array.isArray(results.results) ? results.results : [];

    if (dataResults.length === 0) {
        showErrorMessage(t("popup.no_results"));
        return;
    }

    resultsContainer.innerHTML = `
        <table class="results-table4">
            <thead>
                <tr>
                    <th class="mapCode">${t("thead.mapCode")}</th>
                    <th class="guideVideo">${t("thead.mapVideo")}</th>
                </tr>
            </thead>
            <tbody>
                ${dataResults
                    .map(result => {
                        const embedUrl = getEmbedUrl(result.url);

                        return `
                            <tr>
                                <td>${result.map_code || "N/A"}</td>
                                <td>
                                    ${
                                        embedUrl
                                            ? `<iframe 
                                                    class="rounded-iframe" 
                                                    src="${embedUrl}" 
                                                    frameborder="0" 
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                    allowfullscreen
                                                    style="width: 90%; height: 315px;">
                                               </iframe>`
                                            : "N/A"
                                    }
                                </td>
                            </tr>
                        `;
                    })
                    .join("")}
            </tbody>
        </table>`;
}

function getEmbedUrl(url) {
    if (!url) return null;

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoIdMatch = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
    }

    if (url.includes("bilibili.com")) {
        const videoIdMatch = url.match(/\/video\/([a-zA-Z0-9]+)/);
        return videoIdMatch ? `https://player.bilibili.com/player.html?bvid=${videoIdMatch[1]}` : null;
    }

    return null;
}

function renderPaginationButtons() {
    const paginationContainer = document.getElementById("paginationContainer");
    if(!paginationContainer) return;
    paginationContainer.innerHTML = "";

    if (totalPages <= 1) {
        return;
    }

    const firstButton = document.createElement("button");
    firstButton.textContent = t("pagination.first");
    firstButton.disabled = currentPage === 1;
    firstButton.addEventListener("click", () => changePage(1));
    paginationContainer.appendChild(firstButton);

    const prevButton = document.createElement("button");
    prevButton.textContent = t('pagination.prev');
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => changePage(currentPage - 1));
    paginationContainer.appendChild(prevButton);

    const pageIndicator = document.createElement("span");
    pageIndicator.textContent = t('pagination.page_of', {current: currentPage, total: totalPages});
    paginationContainer.appendChild(pageIndicator);

    const nextButton = document.createElement("button");
    nextButton.textContent = t('pagination.next');
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => changePage(currentPage + 1));
    paginationContainer.appendChild(nextButton);

    const lastButton = document.createElement("button");
    lastButton.textContent = t('pagination.last');
    lastButton.disabled = currentPage === totalPages;
    lastButton.addEventListener("click", () => changePage(totalPages));
    paginationContainer.appendChild(lastButton);
}

async function changePage(pageNumber) {
    currentPage = pageNumber;

    const data = await fetchPageData(currentPage);
    if (data) {
        displayResults(data);

        renderPaginationButtons();

        fetchPageData(currentPage + 1);
        if (currentPage > 1) {
            fetchPageData(currentPage - 1);
        }
    } else {
    }
}

async function fetchPageData(pageNumber) {
    if (cachedPages[currentSection]?.[pageNumber]) {
        return cachedPages[currentSection][pageNumber];
    }

    const apiUrl = apiUrls[currentSection];

    const requestBody = {
        ...activeFilters,
        page_number: pageNumber,
        page_size: pageSize,
    };

    if (currentSection === 'personalRecords' && user_id) {
        requestBody.user_id = user_id;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Erreur réseau : ${response.statusText}`);
        }

        const data = await response.json();

        if (!cachedPages[currentSection]) {
            cachedPages[currentSection] = {};
        }

        cachedPages[currentSection][pageNumber] = data;
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return null;
    }
}

//Pop up 
function showConfirmationMessage(message) {
    const existingPopup = document.querySelector('.confirmation-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    const confirmationPopup = document.createElement('div');
    confirmationPopup.className = 'confirmation-popup';
    confirmationPopup.textContent = message;

    document.body.appendChild(confirmationPopup);

    setTimeout(() => {
        confirmationPopup.classList.add('show');
    }, 10);

    setTimeout(() => {
        confirmationPopup.classList.add('fade-out');
        confirmationPopup.addEventListener('transitionend', () => {
            confirmationPopup.remove();
        }, { once: true });
    }, 800);
}

function showErrorMessage(message) {
    const errorPopup = document.createElement('div');
    errorPopup.className = 'error-popup';
    errorPopup.textContent = message;

    document.body.appendChild(errorPopup);

    setTimeout(() => {
        errorPopup.classList.add('show');
    }, 10);

    setTimeout(() => {
        errorPopup.classList.add('fade-out');
        errorPopup.addEventListener('transitionend', () => {
            errorPopup.remove();
        }, { once: true });
    }, 800);
}

//Graph
async function fetchMapCompletionStatistics(mapCode) {
    try {
        const url = `api/search/getMapCompletionStatistics.php?map_code=${encodeURIComponent(mapCode)}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            console.error("No valid data returned from the API");
            return null;
        }

        const stats = {
            min: data[0]?.min || null,
            max: data[0]?.max || null,
            avg: data[0]?.avg || null,
        };

        //console.log("Fetched Stats:", stats);

        return stats;
    } catch (error) {
        console.error("Error fetching map completion statistics:", error);
        return null;
    }
}


async function fetchProgression(mapCode) {
    try {
        const response = await fetch(`api/search/getUserProgression.php?map_code=${encodeURIComponent(mapCode)}`);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const data = await response.json();

        const chartContainer = document.getElementById("chartContainer");

        if (data.error && data.login_required) {
            chartContainer.innerHTML = `
                <p style="text-align: center; font-weight: bold; color: red;">
                    ⚠️ ${t('popup.login_required_progression')}
                </p>
            `;
            return [];
        }

        if (data.error) {
            chartContainer.innerHTML = `
                <p style="text-align: center; font-weight: bold; color: red;">
                    ${data.message || "An error occurred. Please try again"}
                </p>
            `;
            return [];
        }

        if (!Array.isArray(data) || data.length === 0) {
            chartContainer.innerHTML = `
                <p style="text-align: center; font-weight: bold; color: white;">
                    ${t('popup.no_results')}
                </p>
            `;
            return [];
        }

        const sortedData = (Array.isArray(data) && data.length > 0)
            ? data.map(item => ({
                time: parseFloat(item.time),
                timestamp: new Date(item.inserted_at).toLocaleString(),
                inserted_at: new Date(item.inserted_at),
            })).sort((a, b) => a.inserted_at - b.inserted_at)
            : [];

        renderProgressionChart(sortedData);
        return sortedData;
        
    } catch (error) {
        console.error("Error fetching progression data:", error);
        document.getElementById("chartContainer").innerHTML = `
            <p style="text-align: center; font-weight: bold; color: red;">
                An error occurred. Please try again later.
            </p>
        `;
        return [];
    }
}

function renderProgressionChart(data, stats = { min: null, max: null, avg: null }) {
    const chartContainer = document.getElementById("chartContainer");
    chartContainer.innerHTML = `<canvas id="progressionChart"></canvas>`;

    if (!Array.isArray(data) || data.length === 0) {
        chartContainer.innerHTML = `
            <p style="text-align: center; font-weight: bold; color: white;">
                No valid progression data available to display
            </p>
        `;
        return;
    }

    const recentData = data.slice(-5);

    const maxX = recentData.length === 1 ? 1 : recentData.length - 1;
    const labels = Array.from({ length: maxX + 1 }, (_, i) => `${i}`);

    let times = recentData.map(item => item.time);
    if (recentData.length === 1) {
        times = [times[0], times[0]];
    }

    const { min, max, avg } = stats;
    const avgData = avg !== null ? new Array(labels.length).fill(avg) : [];
    const minData = min !== null ? new Array(labels.length).fill(min) : [];
    const maxData = max !== null ? new Array(labels.length).fill(max) : [];

    const ctx = document.getElementById("progressionChart").getContext("2d");

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: t("chart.user_record_progression"),
                    data: times,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 2,
                },
                {
                    label: t("chart.average_time"),
                    data: avgData,
                    borderColor: "rgba(255, 205, 86, 1)",
                    borderDash: [5, 5],
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: t("chart.min_time"),
                    data: minData,
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderDash: [5, 5],
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: t("chart.max_time"),
                    data: maxData,
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderDash: [5, 5],
                    borderWidth: 2,
                    fill: false,
                },
            ].filter(dataset => dataset.data.length > 0),
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'nearest',
                axis: 'y',
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'center',
                    labels: {
                        color: "#FFFFFF",
                        font: {
                            family: 'Roboto',
                            weight: 'bold',
                            size: 12,
                        },
                        padding: 20,
                    },
                },
                title: {
                    display: true,
                    text: t("chart.record_progression_time"),
                    color: '#FFFFFF',
                    font: {
                        family: 'Roboto',
                        weight: 'bold',
                        size: 18,
                    },
                    padding: {
                        top: 10,
                        bottom: 20,
                    },
                },
                tooltip: {
                    callbacks: {
                        title: () => null,
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: false,
                        text: 'Time (s)',
                        color: '#FFFFFF',
                        font: {
                            family: 'Roboto',
                            weight: 'bold',
                            size: 16,
                            lineHeight: 1.5,
                        },
                    },
                    ticks: {
                        color: '#FFFFFF',
                        font: {
                            family: 'Roboto',
                            weight: 'bold',
                            size: 12,
                        },
                    },
                    grid: {
                        display: false,
                    },
                    border: {
                        display: true,
                        color: '#FFFFFF',
                    },
                },
                x: {
                    title: {
                        display: false,
                        text: 'Completions',
                        color: '#FFFFFF',
                        font: {
                            family: 'Roboto',
                            weight: 'bold',
                            size: 16,
                            lineHeight: 1.5,
                        },
                        padding: { top: -10 },
                    },
                    ticks: {
                        color: '#FFFFFF',
                        font: {
                            family: 'Roboto',
                            weight: 'bold',
                            size: 12,
                        },
                        padding: 0,
                    },
                    grid: {
                        display: false,
                    },
                    border: {
                        display: true,
                        color: '#FFFFFF',
                    },
                    titlePadding: {
                        right: 20,
                    },
                    min: 0,
                },
            },
        },
    });
}